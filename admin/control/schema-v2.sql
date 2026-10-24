-- Additive administration v2: no existing price or user access is reduced.
create table public.sinus_tool_catalog (
 key text primary key, name text not null, category text not null,
 essential boolean not null default false, enabled boolean not null default true,
 updated_at timestamptz not null default now()
);
insert into public.sinus_tool_catalog(key,name,category,essential) values
('home','Início','Portal',true),
('subjects','Matérias','Portal',false),
('study','Central de estudos','Portal',false),
('schedule','Horários','Portal',false),
('agenda','Agenda e compromissos','Portal',false),
('focus','Cronômetro de foco','Portal',false),
('split_screen','Estudo em tela dividida','Portal',false),
('library','Biblioteca','Biblioteca e materiais',false),
('summaries','Resumos e apostilas','Biblioteca e materiais',false),
('slides','Slides','Biblioteca e materiais',false),
('books','Livros','Biblioteca e materiais',false),
('exams','Provas e PDFs','Biblioteca e materiais',false),
('works','Trabalhos','Biblioteca e materiais',false),
('videos','Vídeos','Biblioteca e materiais',false),
('audios','Áudios','Biblioteca e materiais',false),
('practice','Materiais de prática','Biblioteca e materiais',false),
('complementary','Materiais complementares','Biblioteca e materiais',false),
('notebook','Caderno e anotações','Biblioteca e materiais',false),
('transcribe','Transcrição','Biblioteca e materiais',false),
('training','Treinos','Exercícios e revisão',false),
('questions','Banco de questões','Exercícios e revisão',false),
('objective','Questões objetivas','Exercícios e revisão',false),
('subjective','Questões subjetivas','Exercícios e revisão',false),
('true_false','Verdadeiro ou falso','Exercícios e revisão',false),
('image_questions','Questões com imagem','Exercícios e revisão',false),
('citation_questions','Questões de citação','Exercícios e revisão',false),
('flashcards','Flashcards','Exercícios e revisão',false),
('simulado','Simulados','Exercícios e revisão',false),
('daily','Desafio diário','Exercícios e revisão',false),
('errors','Revisão de erros','Exercícios e revisão',false),
('reinforce','Reforço e repetição','Exercícios e revisão',false),
('saved','Questões salvas','Exercícios e revisão',false),
('atlas','Atlas 3D','Ferramentas acadêmicas',false),
('revalida','Revalida','Ferramentas acadêmicas',false),
('enamed','Enamed','Ferramentas acadêmicas',false),
('clinical','Habilidades clínicas','Ferramentas acadêmicas',false),
('immigration','Imigração e documentos','Ferramentas acadêmicas',false),
('ai','Assistente de estudo com IA','Ferramentas acadêmicas',false),
('stats','Estatísticas','Acompanhamento e comunidade',false),
('weak','Pontos fracos','Acompanhamento e comunidade',false),
('dna','Perfil de aprendizagem','Acompanhamento e comunidade',false),
('mentoring','Mentoria','Acompanhamento e comunidade',false),
('study-together','Estudar junto','Acompanhamento e comunidade',false),
('ranking','Comunidade e ranking','Acompanhamento e comunidade',false),
('messages','Mensagens do SINUS','Conta',true),
('profile','Meu perfil','Conta',true),
('plans','Planos e assinatura','Conta',true);
update public.sinus_tool_catalog t set enabled=coalesce((s.value->>t.key)::boolean,true)
 from public.sinus_admin_settings s where s.key='features' and not t.essential;
create table public.sinus_plan_tool_rules (
 plan_code text not null, tool_key text not null references public.sinus_tool_catalog(key),
 operation text not null check(operation in ('view','use','download')),
 enabled boolean not null default true,
 daily_limit integer check(daily_limit>=0), monthly_limit integer check(monthly_limit>=0), total_limit integer check(total_limit>=0),
 updated_at timestamptz not null default now(), primary key(plan_code,tool_key,operation)
);
insert into public.sinus_plan_tool_rules(plan_code,tool_key,operation)
 select p.code,t.key,o.op from (select code from public.subscription_plans union select 'free') p
 cross join public.sinus_tool_catalog t cross join (values ('view'),('use'),('download')) o(op);
create table public.sinus_plan_access (
 user_id uuid primary key references auth.users(id) on delete cascade,
 plan_code text not null, expires_at timestamptz, reason text not null,
 updated_at timestamptz not null default now()
);
create table public.sinus_tool_usage (
 id bigint generated always as identity primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 request_id uuid not null, tool_key text not null references public.sinus_tool_catalog(key),
 operation text not null check(operation in ('view','use','download')),
 plan_code text not null, created_at timestamptz not null default now(), unique(user_id,request_id)
);
create index sinus_tool_usage_counter on public.sinus_tool_usage(user_id,tool_key,operation,created_at desc);
create table public.sinus_messages (
 id uuid primary key, author_id uuid not null references auth.users(id),
 title text not null check(length(title) between 1 and 120),
 body text not null check(length(body)<=5000), image_path text,
 audience text not null check(audience in ('all','plan','user')), target text,
 withdrawn_at timestamptz, created_at timestamptz not null default now()
);
create table public.sinus_message_receipts (
 message_id uuid not null references public.sinus_messages(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 read_at timestamptz, primary key(message_id,user_id)
);
create index sinus_receipts_inbox on public.sinus_message_receipts(user_id,message_id);
-- These tables are service-only. The Edge Function validates every request.
alter table public.sinus_tool_catalog enable row level security;
alter table public.sinus_plan_tool_rules enable row level security;
alter table public.sinus_plan_access enable row level security;
alter table public.sinus_tool_usage enable row level security;
alter table public.sinus_messages enable row level security;
alter table public.sinus_message_receipts enable row level security;
revoke all on public.sinus_tool_catalog,public.sinus_plan_tool_rules,public.sinus_plan_access,public.sinus_tool_usage,public.sinus_messages,public.sinus_message_receipts from anon,authenticated;
grant all on public.sinus_tool_catalog,public.sinus_plan_tool_rules,public.sinus_plan_access,public.sinus_tool_usage,public.sinus_messages,public.sinus_message_receipts to service_role;
grant usage,select on sequence public.sinus_tool_usage_id_seq to service_role;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('sinus-messages','sinus-messages',false,3145728,array['image/jpeg','image/png','image/webp']);
create function public.sinus_resolved_plan(p_user uuid) returns text
 language sql stable security invoker set search_path='' as $$
 select coalesce(
  (select a.plan_code from public.sinus_plan_access a where a.user_id=p_user and (a.expires_at is null or a.expires_at>now())),
  (select s.plan_code from public.subscriptions s where s.user_id=p_user and s.status in ('active','trialing') and (s.current_period_end is null or s.current_period_end>now()) order by s.created_at desc limit 1),
  'free');
$$;
revoke all on function public.sinus_resolved_plan(uuid) from public,anon,authenticated;
grant execute on function public.sinus_resolved_plan(uuid) to service_role;
create function public.sinus_consume_tool(p_user uuid,p_tool text,p_operation text,p_request uuid)
 returns jsonb language plpgsql security invoker set search_path='' as $$
declare tool public.sinus_tool_catalog; rule public.sinus_plan_tool_rules; plan text; daily bigint; monthly bigint; total bigint; previous public.sinus_tool_usage; today timestamptz; month_start timestamptz;
begin
 if p_operation not in ('view','use','download') then raise exception 'Invalid operation'; end if;
 -- Serialize changes and checks per account to prevent parallel overspending.
 perform pg_advisory_xact_lock(hashtextextended(p_user::text,72631));
 if exists(select 1 from public.sinus_access_controls where user_id=p_user and blocked) then return jsonb_build_object('allowed',false,'reason','blocked'); end if;
 select * into tool from public.sinus_tool_catalog where key=p_tool for share;
 if not found then return jsonb_build_object('allowed',false,'reason','unknown_tool'); end if;
 if not tool.enabled and not tool.essential then return jsonb_build_object('allowed',false,'reason','disabled'); end if;
 if exists(select 1 from public.sinus_admin_members where user_id=p_user and role='owner') or tool.essential then return jsonb_build_object('allowed',true,'unlimited',true); end if;
 plan:=public.sinus_resolved_plan(p_user);
 if p_operation<>'view' and not exists(select 1 from public.sinus_plan_tool_rules where plan_code=plan and tool_key=p_tool and operation='view' and enabled) then return jsonb_build_object('allowed',false,'reason','plan_denied','plan_code',plan); end if;
 select * into rule from public.sinus_plan_tool_rules where plan_code=plan and tool_key=p_tool and operation=p_operation for share;
 if not found or not rule.enabled then return jsonb_build_object('allowed',false,'reason','plan_denied','plan_code',plan); end if;
 select * into previous from public.sinus_tool_usage where user_id=p_user and request_id=p_request;
 if found then
  if previous.tool_key<>p_tool or previous.operation<>p_operation then return jsonb_build_object('allowed',false,'reason','request_conflict'); end if;
  return jsonb_build_object('allowed',true,'duplicate',true,'plan_code',plan);
 end if;
 today:=date_trunc('day',now() at time zone 'UTC') at time zone 'UTC';
 month_start:=date_trunc('month',now() at time zone 'UTC') at time zone 'UTC';
 select count(*) filter(where created_at>=today),count(*) filter(where created_at>=month_start),count(*) into daily,monthly,total
 from public.sinus_tool_usage where user_id=p_user and tool_key=p_tool and operation=p_operation;
 if rule.daily_limit is not null and daily>=rule.daily_limit then return jsonb_build_object('allowed',false,'reason','daily_limit','limit',rule.daily_limit); end if;
 if rule.monthly_limit is not null and monthly>=rule.monthly_limit then return jsonb_build_object('allowed',false,'reason','monthly_limit','limit',rule.monthly_limit); end if;
 if rule.total_limit is not null and total>=rule.total_limit then return jsonb_build_object('allowed',false,'reason','total_limit','limit',rule.total_limit); end if;
 insert into public.sinus_tool_usage(user_id,request_id,tool_key,operation,plan_code) values(p_user,p_request,p_tool,p_operation,plan);
 return jsonb_build_object('allowed',true,'plan_code',plan,'used',jsonb_build_object('day',daily+1,'month',monthly+1,'total',total+1));
end; $$;
revoke all on function public.sinus_consume_tool(uuid,text,text,uuid) from public,anon,authenticated;
grant execute on function public.sinus_consume_tool(uuid,text,text,uuid) to service_role;
-- Rule, global availability and audit update atomically.
create function public.sinus_admin_tool_change(p_actor uuid,p_kind text,p_data jsonb)
 returns void language plpgsql security invoker set search_path='' as $$
declare item public.sinus_tool_catalog; oldrow jsonb; role text;
begin
 select m.role into role from public.sinus_admin_members m where m.user_id=p_actor;
 if p_kind='feature' and role not in ('owner','content') or p_kind='rule' and role not in ('owner','finance') or role is null then raise exception 'Not authorized' using errcode='42501'; end if;
 if p_kind not in ('feature','rule') then raise exception 'Invalid action'; end if;
 select * into item from public.sinus_tool_catalog where key=p_data->>'tool_key' for update;
 if not found then raise exception 'Unknown tool'; end if;
 if p_kind='feature' then
  if item.essential and (p_data->>'enabled')::boolean=false then raise exception 'Essential tool'; end if;
  oldrow:=to_jsonb(item);
  update public.sinus_tool_catalog set enabled=(p_data->>'enabled')::boolean,updated_at=now() where key=item.key;
 else
  if item.essential then raise exception 'Essential tool'; end if;
  if not exists(select 1 from public.subscription_plans where code=p_data->>'plan_code') and p_data->>'plan_code'<>'free' then raise exception 'Unknown plan'; end if;
  select to_jsonb(r) into oldrow from public.sinus_plan_tool_rules r where plan_code=p_data->>'plan_code' and tool_key=item.key and operation=p_data->>'operation';
  insert into public.sinus_plan_tool_rules(plan_code,tool_key,operation,enabled,daily_limit,monthly_limit,total_limit)
   values(p_data->>'plan_code',item.key,p_data->>'operation',(p_data->>'enabled')::boolean,(p_data->>'daily_limit')::integer,(p_data->>'monthly_limit')::integer,(p_data->>'total_limit')::integer)
   on conflict(plan_code,tool_key,operation) do update set enabled=excluded.enabled,daily_limit=excluded.daily_limit,monthly_limit=excluded.monthly_limit,total_limit=excluded.total_limit,updated_at=now();
 end if;
 insert into public.sinus_admin_audit(actor_id,action,target,details) values(p_actor,'tool_'||p_kind||'_changed',item.key,jsonb_build_object('before',oldrow,'after',p_data));
end; $$;
revoke all on function public.sinus_admin_tool_change(uuid,text,jsonb) from public,anon,authenticated;
grant execute on function public.sinus_admin_tool_change(uuid,text,jsonb) to service_role;
create function public.sinus_publish_message(p_actor uuid,p_id uuid,p_title text,p_body text,p_image text,p_audience text,p_target text,p_recipients uuid[])
 returns integer language plpgsql security invoker set search_path='' as $$
declare existing public.sinus_messages; n integer;
begin
 if not exists(select 1 from public.sinus_admin_members where user_id=p_actor and role in ('owner','support','content')) then raise exception 'Not authorized' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtextextended(p_id::text,8234));
 select * into existing from public.sinus_messages where id=p_id;
 if found then
  if existing.author_id<>p_actor or existing.title<>p_title or existing.body<>p_body or existing.image_path is distinct from p_image or existing.audience<>p_audience or existing.target is distinct from p_target then raise exception 'Message request conflict'; end if;
  return (select count(*) from public.sinus_message_receipts where message_id=p_id);
 end if;
 if cardinality(p_recipients)<1 or cardinality(p_recipients)>5000 then raise exception 'Invalid recipients'; end if;
 insert into public.sinus_messages(id,author_id,title,body,image_path,audience,target) values(p_id,p_actor,p_title,p_body,p_image,p_audience,p_target);
 insert into public.sinus_message_receipts(message_id,user_id) select p_id,x from unnest(p_recipients) x on conflict do nothing;
 get diagnostics n=row_count;
 insert into public.sinus_admin_audit(actor_id,action,target,details) values(p_actor,'message_published',p_id::text,jsonb_build_object('audience',p_audience,'target',p_target,'recipient_count',n));
 return n;
end; $$;
revoke all on function public.sinus_publish_message(uuid,uuid,text,text,text,text,text,uuid[]) from public,anon,authenticated;
grant execute on function public.sinus_publish_message(uuid,uuid,text,text,text,text,text,uuid[]) to service_role;
create function public.sinus_admin_message_history(p_actor uuid) returns jsonb
 language sql stable security invoker set search_path='' as $$
 select coalesce(jsonb_agg(to_jsonb(q) order by q.created_at desc),'[]'::jsonb) from (
  select m.*, (select count(*) from public.sinus_message_receipts r where r.message_id=m.id) as delivered,
   (select count(*) from public.sinus_message_receipts r where r.message_id=m.id and r.read_at is not null) as reads
  from public.sinus_messages m where exists(select 1 from public.sinus_admin_members a where a.user_id=p_actor and a.role in ('owner','support','content')) order by m.created_at desc limit 100
 ) q;
$$;
revoke all on function public.sinus_admin_message_history(uuid) from public,anon,authenticated;
grant execute on function public.sinus_admin_message_history(uuid) to service_role;
