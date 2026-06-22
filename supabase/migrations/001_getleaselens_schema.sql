create schema if not exists getleaselens;
create extension if not exists pgcrypto;

create table if not exists getleaselens.analyses (
  id uuid primary key default gen_random_uuid(),
  file_hash text unique not null,
  analysis_result jsonb not null,
  created_at timestamptz default now()
);

create table if not exists getleaselens.purchases (
  id uuid primary key default gen_random_uuid(),
  email text null,
  file_hash text not null,
  analysis_id uuid references getleaselens.analyses(id),
  access_token_hash text null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'paid', 'complete', 'expired', 'error')),
  error_message text null,
  created_at timestamptz not null default now()
);

create table if not exists getleaselens.monthly_usage (
  id int primary key default 1,
  month date unique not null default date_trunc('month', now())::date,
  total_cost numeric(10, 4) default 0,
  updated_at timestamptz default now()
);

create table if not exists getleaselens.credit_balances (
  user_id uuid primary key,
  balance int not null default 0 check (balance >= 0),
  updated_at timestamptz not null default now()
);

create index if not exists purchases_analysis_id_idx on getleaselens.purchases (analysis_id);

alter table getleaselens.analyses enable row level security;
alter table getleaselens.purchases enable row level security;
alter table getleaselens.monthly_usage enable row level security;
alter table getleaselens.credit_balances enable row level security;

revoke all on schema getleaselens from anon, authenticated;
revoke all on all tables in schema getleaselens from anon, authenticated;

insert into getleaselens.monthly_usage (id, month, total_cost)
values (1, date_trunc('month', now())::date, 0)
on conflict (month) do nothing;

create or replace function getleaselens.reserve_monthly_usage(cost_to_add numeric)
returns boolean
language plpgsql
security definer
set search_path = getleaselens, public
as $$
declare
  updated_count int;
begin
  insert into getleaselens.monthly_usage (id, month, total_cost)
  values (1, date_trunc('month', now())::date, 0)
  on conflict (month) do nothing;

  update getleaselens.monthly_usage
  set total_cost = total_cost + cost_to_add,
      updated_at = now()
  where month = date_trunc('month', now())::date
    and total_cost + cost_to_add <= 30
  returning 1 into updated_count;

  return updated_count = 1;
end;
$$;

revoke execute on function getleaselens.reserve_monthly_usage(numeric) from anon, authenticated;
