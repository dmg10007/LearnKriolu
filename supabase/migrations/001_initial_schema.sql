-- LearnKriolu — Initial Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS
-- ============================================================
create table if not exists public.users (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null,
  display_name  text,
  avatar_url    text,
  xp_total      integer not null default 0,
  streak_count  integer not null default 0,
  last_active_date date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- ============================================================
-- LESSONS
-- ============================================================
create table if not exists public.lessons (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  description   text,
  category      text not null check (category in ('vocabulary', 'grammar', 'phrasebook')),
  level         text not null default 'beginner' check (level in ('beginner', 'intermediate', 'advanced')),
  order_index   integer not null default 0,
  is_published  boolean not null default false,
  cover_emoji   text,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- LESSON ITEMS
-- ============================================================
create table if not exists public.lesson_items (
  id                      uuid primary key default uuid_generate_v4(),
  lesson_id               uuid not null references public.lessons(id) on delete cascade,
  kriolu_text             text not null,
  english_text            text not null,
  pronunciation_hint      text,
  audio_url               text,
  example_sentence_kriolu text,
  example_sentence_english text,
  item_type               text not null default 'word' check (item_type in ('word', 'phrase', 'sentence')),
  order_index             integer not null default 0,
  created_at              timestamptz not null default now()
);

create index idx_lesson_items_lesson_id on public.lesson_items(lesson_id);

-- ============================================================
-- USER PROGRESS (FSRS fields)
-- ============================================================
create table if not exists public.user_progress (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.users(id) on delete cascade,
  lesson_item_id   uuid not null references public.lesson_items(id) on delete cascade,
  -- FSRS fields
  due_date         timestamptz not null default now(),
  stability        float not null default 0,
  difficulty       float not null default 0,
  elapsed_days     integer not null default 0,
  scheduled_days   integer not null default 0,
  reps             integer not null default 0,
  lapses           integer not null default 0,
  state            integer not null default 0,  -- 0=New, 1=Learning, 2=Review, 3=Relearning
  last_review      timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique(user_id, lesson_item_id)
);

create index idx_user_progress_user_id on public.user_progress(user_id);
create index idx_user_progress_due_date on public.user_progress(due_date);

create trigger user_progress_updated_at
  before update on public.user_progress
  for each row execute function public.set_updated_at();

-- ============================================================
-- USER LESSON COMPLETION
-- ============================================================
create table if not exists public.user_lesson_completion (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.users(id) on delete cascade,
  lesson_id    uuid not null references public.lessons(id) on delete cascade,
  score        integer not null default 0,
  xp_earned    integer not null default 0,
  completed_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================
create table if not exists public.achievements (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references public.users(id) on delete cascade,
  type       text not null,
  earned_at  timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.users enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_items enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_lesson_completion enable row level security;
alter table public.achievements enable row level security;

-- Users: can only read/write their own row
create policy "Users: own row" on public.users
  for all using (auth.uid() = id);

-- Lessons: anyone authenticated can read published lessons
create policy "Lessons: read published" on public.lessons
  for select using (is_published = true);

-- Lesson items: anyone authenticated can read items of published lessons
create policy "Lesson items: read" on public.lesson_items
  for select using (
    exists (
      select 1 from public.lessons
      where id = lesson_items.lesson_id and is_published = true
    )
  );

-- User progress: own rows only
create policy "User progress: own rows" on public.user_progress
  for all using (auth.uid() = user_id);

-- User lesson completion: own rows only
create policy "Lesson completion: own rows" on public.user_lesson_completion
  for all using (auth.uid() = user_id);

-- Achievements: own rows only
create policy "Achievements: own rows" on public.achievements
  for all using (auth.uid() = user_id);
