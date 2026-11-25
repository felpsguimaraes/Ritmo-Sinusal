-- Quem acessou o SINUS: leitura exclusiva da conta proprietária (felpsguimaraes@gmail.com).
-- Aplicar UMA vez no SQL Editor do Supabase. Não altera tabelas existentes.
create or replace function public.sinus_owner_access_log(p_days int default 7, p_limit int default 500)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare since timestamptz := now() - make_interval(days => least(greatest(coalesce(p_days,7),1),90));
begin
 if auth.uid() is null or not exists (
   select 1 from public.sinus_admin_members m where m.user_id = auth.uid() and m.role = 'owner'
 ) then raise exception 'Somente a conta proprietária' using errcode = '42501'; end if;
 return jsonb_build_object(
  'online', (select count(distinct user_id) from public.sinus_access_events where created_at > now() - interval '5 minutes'),
  'events', (select coalesce(jsonb_agg(x), '[]'::jsonb) from (
     select e.kind, e.page, e.created_at, u.email,
            coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', '') as name
     from public.sinus_access_events e join auth.users u on u.id = e.user_id
     where e.created_at >= since order by e.created_at desc limit least(greatest(coalesce(p_limit,500),1),2000)) x),
  'users', (select coalesce(jsonb_agg(y), '[]'::jsonb) from (
     select u.email, coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', '') as name,
            count(*) filter (where e.kind <> 'heartbeat') as visits, count(*) as events,
            min(e.created_at) as first_seen, max(e.created_at) as last_seen
     from public.sinus_access_events e join auth.users u on u.id = e.user_id
     where e.created_at >= since group by u.email, 2 order by max(e.created_at) desc limit 500) y));
end; $$;
revoke all on function public.sinus_owner_access_log(int,int) from public, anon;
grant execute on function public.sinus_owner_access_log(int,int) to authenticated;

-- v5 (25/11/2026): public.sinus_owner_presence(p_days) — online agora, última hora, 24 h, novos cadastros,
-- nome/foto/turma/período (perfis do Sinus + Google), última página, tempo ativo e pessoas por hora.
-- Aplicada no projeto via migração "sinus_owner_presence_v5". Também conta como atividade o salvamento em sinus_documents.
