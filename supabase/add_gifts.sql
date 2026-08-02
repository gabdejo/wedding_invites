-- Run this only — rsvps, complaints and guests already exist.

create table gifts (
  id uuid primary key default gen_random_uuid(),
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text,
  dedication text,
  items text not null,
  amount numeric not null,
  created_at timestamptz not null default now()
);

alter table gifts enable row level security;

create policy "anon can insert gifts"
  on gifts for insert
  to anon
  with check (true);
