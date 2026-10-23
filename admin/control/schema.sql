-- SINUS administration. Service-only writes; no browser secrets.
create schema if not exists sinus_private;
revoke all on schema sinus_private from public;
grant usage on schema sinus_private to authenticated;
create table public.sinus_admin_members (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null check(role in ('owner','support','content','finance')),
 created_at timestamptz not null default now()
);
create table public.sinus_access_controls (
 user_id uuid primary key references auth.users(id) on delete cascade,
 blocked boolean not null default false,
 reason text not null default '', updated_at timestamptz not null default now()
);
create table public.sinus_admin_audit (
 id bigint generated always as identity primary key,
 actor_id uuid references auth.users(id), action text not null,
 target text not null, details jsonb not null default '{}',
 created_at timestamptz not null default now()
);
create table public.sinus_access_events (
 id bigint generated always as identity primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 kind text not null check(kind in ('login','heartbeat','page')),
 page text not null default '/', created_at timestamptz not null default now()
);
create index sinus_events_time_idx on public.sinus_access_events(created_at desc);
create index sinus_events_user_idx on public.sinus_access_events(user_id,created_at desc);
create table public.sinus_admin_settings (
 key text primary key, value jsonb not null, updated_at timestamptz not null default now()
);
insert into public.sinus_admin_settings(key,value) values
 ('announcement','{"enabled":false,"text":""}'),
 ('features','{"library":true,"flashcards":true,"revalida":true,"atlas":true,"ai":true}');
-- The account selected by the owner during this session. No generated UUID is hardcoded.
insert into public.sinus_admin_members(user_id,role)
 select id,'owner' from auth.users where lower(email)='felpsguimaraes@gmail.com';
alter table public.sinus_admin_members enable row level security;
alter table public.sinus_access_controls enable row level security;
alter table public.sinus_admin_audit enable row level security;
alter table public.sinus_access_events enable row level security;
alter table public.sinus_admin_settings enable row level security;
revoke all on public.sinus_admin_members,public.sinus_access_controls,public.sinus_admin_audit,public.sinus_access_events,public.sinus_admin_settings from anon,authenticated;
grant all on public.sinus_admin_members,public.sinus_access_controls,public.sinus_admin_audit,public.sinus_access_events,public.sinus_admin_settings to service_role;
grant usage,select on sequence public.sinus_admin_audit_id_seq,public.sinus_access_events_id_seq to service_role;
create function sinus_private.account_allowed() returns boolean
 language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and not exists (
  select 1 from public.sinus_access_controls a where a.user_id=auth.uid() and a.blocked
 ) and exists (select 1 from auth.users u where u.id=auth.uid() and (u.banned_until is null or u.banned_until<now()));
$$;
revoke all on function sinus_private.account_allowed() from public;
grant execute on function sinus_private.account_allowed() to authenticated;
create policy sinus_block_guard on public.profiles as restrictive for all to authenticated using ((select sinus_private.account_allowed())) with check ((select sinus_private.account_allowed()));
create policy sinus_block_guard on public.sinus_documents as restrictive for all to authenticated using ((select sinus_private.account_allowed())) with check ((select sinus_private.account_allowed()));
create policy sinus_block_guard on public.subscriptions as restrictive for all to authenticated using ((select sinus_private.account_allowed())) with check ((select sinus_private.account_allowed()));
create policy sinus_block_guard on public.sinus_ai_usage as restrictive for all to authenticated using ((select sinus_private.account_allowed())) with check ((select sinus_private.account_allowed()));
