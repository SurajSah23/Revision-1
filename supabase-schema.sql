-- Run this in Supabase Dashboard → SQL Editor to create the tasks table.
-- Replace "public" if you use a different schema.

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  status text not null default 'Pending' check (status in ('Pending', 'Completed')),
  created_at timestamptz not null default now()
);
