-- Idempotent schema; run with `pnpm db:migrate`.
create table if not exists projects (
  id          serial primary key,
  slug        text not null unique,
  published   boolean not null default false,
  sort_order  integer not null default 0,
  tag         text not null default '',
  cover_url   text,
  title_en    text not null,
  title_id    text not null default '',
  summary_en  text not null default '',
  summary_id  text not null default '',
  body_en     text not null default '',
  body_id     text not null default '',
  outcome_en  text not null default '',
  outcome_id  text not null default '',
  metrics     jsonb not null default '[]'::jsonb,
  gallery     jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists rate_events (
  kind       text not null,
  ip         text not null,
  created_at timestamptz not null default now()
);
create index if not exists rate_events_lookup on rate_events (kind, ip, created_at);
