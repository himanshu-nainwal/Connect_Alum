-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Users table (Verified: exists)
create table if not exists public.users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password text not null,
  name text not null,
  role text check (role in ('alumni', 'admin', 'student')) not null,
  -- New fields for profile
  college text,
  grad_year integer,
  department text,
  skills text[],
  job_role text,
  company text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Mentors table (Verified: exists)
create table if not exists public.mentors (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  user_id uuid references public.users(id), -- Link to user if they are a registered alumni
  profile_link text,
  communication text[],
  organization text,
  location text,
  experience integer,
  expertise text,
  linkedin text,
  instagram text,
  twitter text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Events table (Verified: exists)
create table if not exists public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  department text not null,
  location text not null,
  updated_on text not null,
  tags text[] not null,
  price numeric not null,
  registration_days_left integer not null,
  description text not null,
  speakers text[] not null,
  meeting_link text default '',
  posted_by uuid references public.users(id), -- Link to alumni who posted
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Jobs table (New)
create table if not exists public.jobs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company text not null,
  location text not null,
  type text check (type in ('Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance')),
  description text,
  posted_by uuid references public.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Registrations table (New)
create table if not exists public.registrations (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.events(id) not null,
  student_id uuid references public.users(id) not null,
  status text default 'registered',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(event_id, student_id)
);

-- Reset policies to avoid errors if they exist
drop policy if exists "Enable all access for all users" on public.users;
drop policy if exists "Enable all access for all users" on public.mentors;
drop policy if exists "Enable all access for all users" on public.events;
drop policy if exists "Enable all access for all users" on public.jobs;
drop policy if exists "Enable all access for all users" on public.registrations;

-- Enable RLS
alter table public.users enable row level security;
alter table public.mentors enable row level security;
alter table public.events enable row level security;
alter table public.jobs enable row level security;
alter table public.registrations enable row level security;

-- Open access for development (re-creating policies)
create policy "Enable all access for all users" on public.users for all using (true) with check (true);
create policy "Enable all access for all users" on public.mentors for all using (true) with check (true);
create policy "Enable all access for all users" on public.events for all using (true) with check (true);
create policy "Enable all access for all users" on public.jobs for all using (true) with check (true);
create policy "Enable all access for all users" on public.registrations for all using (true) with check (true);
