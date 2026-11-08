-- Public seating lookup (app/mesa). Run once in the Supabase SQL editor.
-- Same rules as app/mesas/seated.ts: latest RSVP per invitation wins, and only
-- the first `guests` persons of a confirmed invitation are seated.
-- If you change one, change the other.

create extension if not exists unaccent;

-- Internal helper: not callable from the browser.
create or replace function seated_persons()
returns table(id uuid, name text, table_no int)
language sql
security definer
set search_path = public, extensions
as $$
  with latest as (
    select distinct on (guest_id) guest_id, attending, guests
    from rsvps
    where guest_id is not null
    order by guest_id, created_at desc
  ),
  numbered as (
    select p.id, p.guest_id, p.person_number, p.table_no,
           coalesce(p.full_name, 'Acompañante ' || p.person_number) as name,
           row_number() over (partition by p.guest_id order by p.person_number) as n
    from guest_persons p
  )
  select n.id, n.name, n.table_no
  from numbered n
  join latest l on l.guest_id = n.guest_id and l.attending and n.n <= l.guests
  join guests g on g.id = n.guest_id
  order by g.whatsapp_sent_at nulls last, g.created_at, n.person_number;
$$;
revoke execute on function seated_persons() from public, anon, authenticated;

-- At least 3 chars, at most 6 matches. Plain substring match (no LIKE wildcards).
create or replace function find_seat(q text)
returns table(id uuid, name text, table_no int)
language sql
security definer
set search_path = public, extensions
as $$
  select s.id, s.name, s.table_no
  from seated_persons() s
  where length(trim(q)) >= 3
    and position(lower(unaccent(trim(q))) in lower(unaccent(s.name))) > 0
  limit 6;
$$;
grant execute on function find_seat(text) to anon;

create or replace function table_guests(n int)
returns table(id uuid, name text)
language sql
security definer
set search_path = public, extensions
as $$
  select s.id, s.name from seated_persons() s where s.table_no = n;
$$;
grant execute on function table_guests(int) to anon;
