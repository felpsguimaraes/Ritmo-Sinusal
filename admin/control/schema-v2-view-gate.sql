create or replace function public.sinus_consume_tool(p_user uuid,p_tool text,p_operation text,p_request uuid)
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
