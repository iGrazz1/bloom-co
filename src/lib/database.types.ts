export type Platform = 'instagram' | 'tiktok' | 'facebook' | 'pinterest' | 'etsy'
export type VideoStatus = 'draft' | 'scheduled' | 'published'
export type Sentiment = 'positive' | 'neutral' | 'negative'
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded'

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: Account
        Insert: Omit<Account, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Account, 'id' | 'created_at'>>
      }
      videos: {
        Row: Video
        Insert: Omit<Video, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Video, 'id' | 'created_at'>>
      }
      video_platform_stats: {
        Row: VideoPlatformStat
        Insert: Omit<VideoPlatformStat, 'id' | 'created_at'>
        Update: Partial<Omit<VideoPlatformStat, 'id' | 'created_at'>>
      }
      comments: {
        Row: Comment
        Insert: Omit<Comment, 'id' | 'created_at'>
        Update: Partial<Omit<Comment, 'id' | 'created_at'>>
      }
      etsy_listings: {
        Row: EtsyListing
        Insert: Omit<EtsyListing, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<EtsyListing, 'id' | 'created_at'>>
      }
      etsy_orders: {
        Row: EtsyOrder
        Insert: Omit<EtsyOrder, 'id' | 'created_at'>
        Update: Partial<Omit<EtsyOrder, 'id' | 'created_at'>>
      }
      ai_reports: {
        Row: AiReport
        Insert: Omit<AiReport, 'id' | 'created_at'>
        Update: Partial<Omit<AiReport, 'id' | 'created_at'>>
      }
      content_dna_scores: {
        Row: ContentDnaScore
        Insert: Omit<ContentDnaScore, 'id' | 'created_at'>
        Update: Partial<Omit<ContentDnaScore, 'id' | 'created_at'>>
      }
      competitors: {
        Row: Competitor
        Insert: Omit<Competitor, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Competitor, 'id' | 'created_at'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export interface Account {
  id: string
  platform: Platform
  username: string
  display_name: string
  followers: number
  following: number
  profile_url: string | null
  avatar_url: string | null
  access_token: string | null
  token_expires_at: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Video {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  video_url: string | null
  duration_seconds: number | null
  status: VideoStatus
  tags: string[]
  content_dna_score: number | null
  created_at: string
  updated_at: string
  published_at: string | null
}

export interface VideoPlatformStat {
  id: string
  video_id: string
  account_id: string
  platform_post_id: string | null
  views: number
  likes: number
  comments: number
  shares: number
  saves: number
  reach: number
  impressions: number
  watch_time_seconds: number | null
  posted_at: string | null
  created_at: string
}

export interface Comment {
  id: string
  video_platform_stat_id: string
  account_id: string
  platform_comment_id: string | null
  author_name: string
  author_handle: string | null
  content: string
  sentiment: Sentiment
  sentiment_score: number
  ai_reply_draft: string | null
  reply_posted: boolean
  reply_posted_at: string | null
  posted_at: string
  created_at: string
}

export interface EtsyListing {
  id: string
  listing_id: string
  title: string
  description: string | null
  price_cents: number
  currency: string
  quantity: number
  tags: string[]
  views: number
  favorites: number
  url: string | null
  status: 'active' | 'inactive' | 'draft'
  created_at: string
  updated_at: string
}

export interface EtsyOrder {
  id: string
  order_id: string
  listing_id: string | null
  buyer_country: string | null
  buyer_state: string | null
  amount_cents: number
  currency: string
  status: OrderStatus
  purchased_at: string
  created_at: string
}

export interface AiReport {
  id: string
  report_type: 'weekly' | 'monthly' | 'forecast' | 'competitor'
  week_start: string | null
  week_end: string | null
  title: string
  content: string
  summary: string | null
  created_at: string
}

export interface ContentDnaScore {
  id: string
  video_id: string
  hook_strength: number
  emotional_resonance: number
  visual_quality: number
  trend_alignment: number
  cta_effectiveness: number
  overall_score: number
  notes: string | null
  created_at: string
}

export interface Competitor {
  id: string
  platform: Platform
  username: string
  display_name: string
  followers: number
  avg_views: number | null
  posting_frequency: number | null
  notes: string | null
  created_at: string
  updated_at: string
}
