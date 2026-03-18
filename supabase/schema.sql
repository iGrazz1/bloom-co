-- ============================================
-- Bloom & Co — Full Database Schema
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- ACCOUNTS (Social Media)
-- ============================================
create table if not exists accounts (
  id uuid primary key default uuid_generate_v4(),
  platform text not null check (platform in ('instagram', 'tiktok', 'facebook', 'pinterest', 'etsy')),
  username text not null,
  display_name text not null,
  followers integer not null default 0,
  following integer not null default 0,
  profile_url text,
  avatar_url text,
  access_token text,
  token_expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (platform, username)
);

-- ============================================
-- VIDEOS (Content Library)
-- ============================================
create table if not exists videos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  thumbnail_url text,
  video_url text,
  duration_seconds integer,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published')),
  tags text[] not null default '{}',
  content_dna_score numeric(4,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

-- ============================================
-- VIDEO PLATFORM STATS (Per-platform performance)
-- ============================================
create table if not exists video_platform_stats (
  id uuid primary key default uuid_generate_v4(),
  video_id uuid not null references videos(id) on delete cascade,
  account_id uuid not null references accounts(id) on delete cascade,
  platform_post_id text,
  views integer not null default 0,
  likes integer not null default 0,
  comments integer not null default 0,
  shares integer not null default 0,
  saves integer not null default 0,
  reach integer not null default 0,
  impressions integer not null default 0,
  watch_time_seconds integer,
  posted_at timestamptz,
  created_at timestamptz not null default now(),
  unique (video_id, account_id)
);

-- ============================================
-- COMMENTS (All platforms)
-- ============================================
create table if not exists comments (
  id uuid primary key default uuid_generate_v4(),
  video_platform_stat_id uuid not null references video_platform_stats(id) on delete cascade,
  account_id uuid not null references accounts(id) on delete cascade,
  platform_comment_id text,
  author_name text not null,
  author_handle text,
  content text not null,
  sentiment text not null default 'neutral' check (sentiment in ('positive', 'neutral', 'negative')),
  sentiment_score numeric(4,3) not null default 0.5 check (sentiment_score >= 0 and sentiment_score <= 1),
  ai_reply_draft text,
  reply_posted boolean not null default false,
  reply_posted_at timestamptz,
  posted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ============================================
-- ETSY LISTINGS
-- ============================================
create table if not exists etsy_listings (
  id uuid primary key default uuid_generate_v4(),
  listing_id text not null unique,
  title text not null,
  description text,
  price_cents integer not null default 0,
  currency text not null default 'USD',
  quantity integer not null default 0,
  tags text[] not null default '{}',
  views integer not null default 0,
  favorites integer not null default 0,
  url text,
  status text not null default 'active' check (status in ('active', 'inactive', 'draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- ETSY ORDERS
-- ============================================
create table if not exists etsy_orders (
  id uuid primary key default uuid_generate_v4(),
  order_id text not null unique,
  listing_id uuid references etsy_listings(id) on delete set null,
  buyer_country text,
  buyer_state text,
  amount_cents integer not null default 0,
  currency text not null default 'USD',
  status text not null default 'completed' check (status in ('pending', 'processing', 'completed', 'cancelled', 'refunded')),
  purchased_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ============================================
-- AI REPORTS
-- ============================================
create table if not exists ai_reports (
  id uuid primary key default uuid_generate_v4(),
  report_type text not null check (report_type in ('weekly', 'monthly', 'forecast', 'competitor')),
  week_start date,
  week_end date,
  title text not null,
  content text not null,
  summary text,
  created_at timestamptz not null default now()
);

-- ============================================
-- CONTENT DNA SCORES
-- ============================================
create table if not exists content_dna_scores (
  id uuid primary key default uuid_generate_v4(),
  video_id uuid not null references videos(id) on delete cascade,
  hook_strength numeric(4,2) not null default 0 check (hook_strength >= 0 and hook_strength <= 10),
  emotional_resonance numeric(4,2) not null default 0 check (emotional_resonance >= 0 and emotional_resonance <= 10),
  visual_quality numeric(4,2) not null default 0 check (visual_quality >= 0 and visual_quality <= 10),
  trend_alignment numeric(4,2) not null default 0 check (trend_alignment >= 0 and trend_alignment <= 10),
  cta_effectiveness numeric(4,2) not null default 0 check (cta_effectiveness >= 0 and cta_effectiveness <= 10),
  overall_score numeric(4,2) not null default 0 check (overall_score >= 0 and overall_score <= 10),
  notes text,
  created_at timestamptz not null default now(),
  unique (video_id)
);

-- ============================================
-- COMPETITORS
-- ============================================
create table if not exists competitors (
  id uuid primary key default uuid_generate_v4(),
  platform text not null check (platform in ('instagram', 'tiktok', 'facebook', 'pinterest', 'etsy')),
  username text not null,
  display_name text not null,
  followers integer not null default 0,
  avg_views integer,
  posting_frequency numeric(4,1),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (platform, username)
);

-- ============================================
-- REVENUE SNAPSHOTS (daily rollups)
-- ============================================
create table if not exists revenue_snapshots (
  id uuid primary key default uuid_generate_v4(),
  snapshot_date date not null unique,
  total_revenue_cents integer not null default 0,
  order_count integer not null default 0,
  total_views integer not null default 0,
  new_followers integer not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================
-- INDEXES
-- ============================================
create index if not exists idx_video_platform_stats_video_id on video_platform_stats(video_id);
create index if not exists idx_video_platform_stats_account_id on video_platform_stats(account_id);
create index if not exists idx_comments_account_id on comments(account_id);
create index if not exists idx_comments_sentiment on comments(sentiment);
create index if not exists idx_etsy_orders_purchased_at on etsy_orders(purchased_at);
create index if not exists idx_etsy_orders_status on etsy_orders(status);
create index if not exists idx_revenue_snapshots_date on revenue_snapshots(snapshot_date);
create index if not exists idx_ai_reports_type on ai_reports(report_type);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger accounts_updated_at
  before update on accounts
  for each row execute function update_updated_at();

create or replace trigger videos_updated_at
  before update on videos
  for each row execute function update_updated_at();

create or replace trigger etsy_listings_updated_at
  before update on etsy_listings
  for each row execute function update_updated_at();

create or replace trigger competitors_updated_at
  before update on competitors
  for each row execute function update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (enable but allow all for now)
-- ============================================
alter table accounts enable row level security;
alter table videos enable row level security;
alter table video_platform_stats enable row level security;
alter table comments enable row level security;
alter table etsy_listings enable row level security;
alter table etsy_orders enable row level security;
alter table ai_reports enable row level security;
alter table content_dna_scores enable row level security;
alter table competitors enable row level security;
alter table revenue_snapshots enable row level security;

-- Allow all access via service role (dashboard is internal tool)
create policy "allow_all_accounts" on accounts for all using (true) with check (true);
create policy "allow_all_videos" on videos for all using (true) with check (true);
create policy "allow_all_vps" on video_platform_stats for all using (true) with check (true);
create policy "allow_all_comments" on comments for all using (true) with check (true);
create policy "allow_all_etsy_listings" on etsy_listings for all using (true) with check (true);
create policy "allow_all_etsy_orders" on etsy_orders for all using (true) with check (true);
create policy "allow_all_ai_reports" on ai_reports for all using (true) with check (true);
create policy "allow_all_dna_scores" on content_dna_scores for all using (true) with check (true);
create policy "allow_all_competitors" on competitors for all using (true) with check (true);
create policy "allow_all_revenue_snapshots" on revenue_snapshots for all using (true) with check (true);
