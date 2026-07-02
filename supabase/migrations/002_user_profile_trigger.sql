-- LearnKriolu — Migration 002: Auto-create user profile on signup
-- Run this in your Supabase SQL Editor AFTER 001_initial_schema.sql

-- This trigger fires whenever a new row is inserted into auth.users
-- (i.e., every time someone signs up). It automatically creates the
-- corresponding public.users profile row so we never have orphaned auth users.

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, display_name, xp_total, streak_count)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    0,
    0
  )
  on conflict (id) do nothing; -- safe to re-run
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if re-running
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- STREAK UPDATE FUNCTION
-- Called from the client on every login to maintain streak_count
-- ============================================================
create or replace function public.update_user_streak(p_user_id uuid)
returns void as $$
declare
  v_last_active date;
  v_today       date := current_date;
begin
  select last_active_date into v_last_active
  from public.users
  where id = p_user_id;

  if v_last_active is null then
    -- First ever login
    update public.users
    set last_active_date = v_today,
        streak_count     = 1
    where id = p_user_id;

  elsif v_last_active = v_today then
    -- Already logged in today — do nothing
    null;

  elsif v_last_active = v_today - interval '1 day' then
    -- Consecutive day — increment streak
    update public.users
    set last_active_date = v_today,
        streak_count     = streak_count + 1
    where id = p_user_id;

  else
    -- Streak broken — reset to 1
    update public.users
    set last_active_date = v_today,
        streak_count     = 1
    where id = p_user_id;
  end if;
end;
$$ language plpgsql security definer;

-- Grant execute to authenticated users (they can only affect their own row
-- because the function uses the passed user_id and RLS still applies to selects)
grant execute on function public.update_user_streak(uuid) to authenticated;
