-- Run this in Supabase Dashboard → SQL Editor to create the todos and tasks tables.
-- Replace "public" if you use a different schema.

-- Optional: original todos table (for backward compatibility)
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Task Management table (Assessment: id, title, description, status, created_at)
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  status text not null default 'Pending' check (status in ('Pending', 'Completed')),
  created_at timestamptz not null default now()
);

-- Optional: trigger to auto-update updated_at on todos
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger todos_updated_at
  before update on public.todos
  for each row execute function public.set_updated_at();
