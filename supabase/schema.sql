-- RSVP submissions (components/RsvpSection.tsx)
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  attending boolean not null,
  guests int not null default 1,
  notes text,
  created_at timestamptz not null default now()
);

alter table rsvps enable row level security;

create policy "anon can insert rsvps"
  on rsvps for insert
  to anon
  with check (true);

-- Libro de Reclamaciones (components/legal/ComplaintsBookForm.tsx)
create table complaints (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  document_id text not null,
  email text not null,
  phone text not null,
  address text not null,
  type text not null check (type in ('reclamo', 'queja')),
  product text not null,
  amount text,
  detail text not null,
  request text not null,
  created_at timestamptz not null default now()
);

alter table complaints enable row level security;

create policy "anon can insert complaints"
  on complaints for insert
  to anon
  with check (true);

-- Guest list (invite-only RSVP gating, components/RsvpSection.tsx)
create table guests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  max_guests int not null default 1 check (max_guests > 0),
  created_at timestamptz not null default now()
);

-- RLS enabled with no select policy: the guests table itself stays private.
-- Name search only goes through the search_guests() function below, which
-- returns at most 5 matches instead of exposing the full guest list.
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

-- Link each RSVP to the guest-list entry it matched
alter table rsvps add column guest_id uuid references guests(id);

-- Gift purchases (components/RegistrySection.tsx). buyer_name is free text —
-- match it against guests.full_name later with a fuzzy join (e.g. pg_trgm)
-- rather than linking guest_id at insert time.
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
