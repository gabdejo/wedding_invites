-- Run this only — rsvps and complaints already exist.

create table guests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  max_guests int not null default 1 check (max_guests > 0),
  created_at timestamptz not null default now()
);

alter table guests enable row level security;

create or replace function search_guests(search_query text)
returns table(id uuid, full_name text, max_guests int)
language sql
security definer
set search_path = public
as $$
  select id, full_name, max_guests
  from guests
  where full_name ilike '%' || search_query || '%'
  order by full_name
  limit 5;
$$;

grant execute on function search_guests(text) to anon;

alter table rsvps add column guest_id uuid references guests(id);
