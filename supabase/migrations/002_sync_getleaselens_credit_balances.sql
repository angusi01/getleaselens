create table if not exists getleaselens.credit_balances (
  user_id uuid primary key,
  balance int not null default 0 check (balance >= 0),
  updated_at timestamptz not null default now()
);

alter table getleaselens.credit_balances enable row level security;

revoke all on getleaselens.credit_balances from anon, authenticated;
