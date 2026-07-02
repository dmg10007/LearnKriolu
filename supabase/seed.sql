-- LearnKriolu — Seed Data
-- Run AFTER 001_initial_schema.sql
-- Adds the first lesson: Greetings (Sotavento Kriolu)

insert into public.lessons (id, title, description, category, level, order_index, is_published, cover_emoji)
values (
  'a1b2c3d4-0001-0000-0000-000000000001',
  'Greetings',
  'Learn how to greet people and introduce yourself in everyday Kriolu.',
  'vocabulary',
  'beginner',
  1,
  true,
  '👋'
);

insert into public.lesson_items
  (lesson_id, kriolu_text, english_text, pronunciation_hint, item_type, order_index)
values
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Bon dia',          'Good morning',          'bohn dee-ah',         'phrase', 1),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Bon tardi',         'Good afternoon',        'bohn tar-dee',        'phrase', 2),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Bon noti',          'Good night',            'bohn noh-tee',        'phrase', 3),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Kuma bu sta?',      'How are you?',          'koo-mah boo stah',    'phrase', 4),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'N sta ben',         'I am fine',             'n stah ben',          'phrase', 5),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Obrigadu',          'Thank you (m)',         'oh-bree-gah-doo',     'word',   6),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Obrigada',          'Thank you (f)',         'oh-bree-gah-dah',     'word',   7),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Di nada',           'You''re welcome',       'dee nah-dah',         'phrase', 8),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Kal é bu nomi?',    'What is your name?',    'kal eh boo noh-mee',  'phrase', 9),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Nha nomi é…',       'My name is…',           'nyah noh-mee eh',     'phrase', 10),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Praser',            'Nice to meet you',      'prah-zer',            'word',   11),
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Txau',              'Goodbye / Bye',         'chow',                'word',   12);
