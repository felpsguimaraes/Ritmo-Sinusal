-- A portal action may touch more than one tool; reserve all counters or none.
create function public.sinus_consume_tools(p_user uuid,p_checks jsonb) returns jsonb
 language plpgsql security invoker set search_path='' as $$
declare item jsonb; result jsonb; failure text;
begin
 if jsonb_typeof(p_checks)<>'array' or jsonb_array_length(p_checks) not between 1 and 8 then raise exception 'Invalid checks'; end if;
 begin
  for item in select value from jsonb_array_elements(p_checks) loop
   result:=public.sinus_consume_tool(p_user,item->>'tool_key',item->>'operation',(item->>'request_id')::uuid);
   if not (result->>'allowed')::boolean then raise exception using errcode='P0001',message='Quota rejected',detail=result::text; end if;
  end loop;
  return jsonb_build_object('allowed',true);
 exception when sqlstate 'P0001' then
  get stacked diagnostics failure=PG_EXCEPTION_DETAIL;
  if coalesce(failure,'')='' then raise; end if;
  return failure::jsonb;
 end;
end; $$;
revoke all on function public.sinus_consume_tools(uuid,jsonb) from public,anon,authenticated;
grant execute on function public.sinus_consume_tools(uuid,jsonb) to service_role;
create function public.sinus_my_tool_usage(p_user uuid) returns jsonb
 language sql stable security invoker set search_path='' as $$
 select coalesce(jsonb_agg(to_jsonb(q)),'[]'::jsonb) from (
  select tool_key,operation,count(*) as total,
   count(*) filter(where created_at>=(date_trunc('day',now() at time zone 'UTC') at time zone 'UTC')) as day,
   count(*) filter(where created_at>=(date_trunc('month',now() at time zone 'UTC') at time zone 'UTC')) as month
  from public.sinus_tool_usage where user_id=p_user group by tool_key,operation
 ) q;
$$;
revoke all on function public.sinus_my_tool_usage(uuid) from public,anon,authenticated;
grant execute on function public.sinus_my_tool_usage(uuid) to service_role;
