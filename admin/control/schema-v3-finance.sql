-- Confirmed cash ledger. No client writes; populate only from a verified payment integration.
-- One unique external reference per provider and kind prevents duplicate imports.
create table public.sinus_financial_entries (
 id uuid primary key default gen_random_uuid(),
 source text not null check(length(source) between 1 and 80),
 external_id text not null check(length(external_id) between 1 and 200),
 kind text not null check(kind in ('payment','refund')),
 amount_cents bigint not null check(amount_cents > 0 and amount_cents <= 10000000000),
 currency text not null default 'BRL' check(currency='BRL'),
 occurred_at timestamptz not null check(occurred_at <= now()),
 created_at timestamptz not null default now(),
 unique(source,external_id,kind)
);
alter table public.sinus_financial_entries enable row level security;
revoke all on public.sinus_financial_entries from public,anon,authenticated;
grant select,insert on public.sinus_financial_entries to service_role;
create index sinus_financial_entries_occurred_idx on public.sinus_financial_entries(occurred_at desc);

create or replace function public.sinus_finance_summary(p_year integer)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare result jsonb;
begin
 if p_year < 2020 or p_year > 2100 or p_year is null then raise exception 'Invalid year'; end if;
 with active as (
  select s.user_id,s.plan_code from public.subscriptions s
  where s.status='active' and (s.current_period_end is null or s.current_period_end>now())
 ), totals as (
  select coalesce(sum(amount_cents) filter(where kind='payment'),0) received,
   coalesce(sum(amount_cents) filter(where kind='refund'),0) refunded,
   coalesce(sum(amount_cents) filter(where kind='payment' and date_trunc('month',occurred_at at time zone 'America/Sao_Paulo')=date_trunc('month',now() at time zone 'America/Sao_Paulo')),0) current_month
  from public.sinus_financial_entries
 ), monthly as (
  select m.month,
   coalesce(sum(e.amount_cents) filter(where e.kind='payment'),0) received_cents,
   coalesce(sum(e.amount_cents) filter(where e.kind='refund'),0) refund_cents
  from generate_series(1,12) m(month)
  left join public.sinus_financial_entries e on e.occurred_at >= (make_date(p_year,m.month,1)::timestamp at time zone 'America/Sao_Paulo')
   and e.occurred_at < ((make_date(p_year,m.month,1)+interval '1 month')::timestamp at time zone 'America/Sao_Paulo')
  group by m.month
 )
 select jsonb_build_object(
  'year',p_year,'currency','BRL','timezone','America/Sao_Paulo',
  'subscribers',(select count(distinct user_id) from active),
  'trials',(select count(distinct user_id) from public.subscriptions where status='trialing' and (current_period_end is null or current_period_end>now())),
  'manual_access',(select count(*) from public.sinus_plan_access where plan_code<>'free' and (expires_at is null or expires_at>now())),
  'total_cents',t.received,'refund_cents',t.refunded,'net_cents',t.received-t.refunded,'current_month_cents',t.current_month,
  'months',(select jsonb_agg(jsonb_build_object('month',month,'received_cents',received_cents,'refund_cents',refund_cents,'net_cents',received_cents-refund_cents) order by month) from monthly),
  'plans',coalesce((select jsonb_agg(p) from (select p.code,p.name,count(distinct a.user_id) subscribers from public.subscription_plans p left join active a on a.plan_code=p.code group by p.code,p.name order by p.name) p),'[]'::jsonb),
  'entries',coalesce((select jsonb_agg(e) from (select kind,amount_cents,occurred_at,source,external_id from public.sinus_financial_entries order by occurred_at desc,id limit 100) e),'[]'::jsonb)
 ) into result from totals t;
 return result;
end; $$;
revoke all on function public.sinus_finance_summary(integer) from public,anon,authenticated;
grant execute on function public.sinus_finance_summary(integer) to service_role;
