'use client'

import { useState } from 'react'
import {
  Eye, Heart, Bookmark, Share2, MessageCircle,
  Upload, Filter, SortAsc, TrendingUp, Flame,
  Play, Search, ChevronDown, Star,
} from 'lucide-react'

const PLATFORMS = ['All', 'TikTok', 'Instagram', 'Facebook', 'Pinterest']
const SORT_OPTIONS = ['views', 'likes', 'saves', 'dna', 'date'] as const

type SortKey = typeof SORT_OPTIONS[number]
type StatusBadge = 'viral' | 'trending' | 'steady' | 'new'

interface VideoItem {
  id: string
  title: string
  platform: string
  account: string
  views: number
  likes: number
  saves: number
  shares: number
  comments: number
  dna: number
  status: StatusBadge
  postedAt: string
  duration: string
  tags: string[]
}

const videos: VideoItem[] = [
  { id: '1', title: 'Boho Garden Wedding Invite Reveal', platform: 'TikTok', account: '@bloomandco', views: 284000, likes: 18200, saves: 9100, shares: 3400, comments: 412, dna: 9.2, status: 'viral', postedAt: '2026-03-10', duration: '0:47', tags: ['boho', 'reveal', 'wedding'] },
  { id: '2', title: 'Boho Garden Wedding Invite Reveal', platform: 'Instagram', account: '@bloom.co', views: 141000, likes: 9800, saves: 4200, shares: 1800, comments: 287, dna: 9.0, status: 'viral', postedAt: '2026-03-10', duration: '0:47', tags: ['boho', 'reveal', 'wedding'] },
  { id: '3', title: 'How I Design Wedding Invitations in 2025', platform: 'TikTok', account: '@bloomandco', views: 98000, likes: 6100, saves: 3800, shares: 1200, comments: 198, dna: 8.7, status: 'trending', postedAt: '2026-03-07', duration: '2:14', tags: ['process', 'design', 'tutorial'] },
  { id: '4', title: '5 Templates Brides Are Obsessing Over', platform: 'Pinterest', account: '@bloomandco', views: 76000, likes: 4400, saves: 6800, shares: 920, comments: 64, dna: 8.4, status: 'trending', postedAt: '2026-03-05', duration: '1:02', tags: ['templates', 'trending', 'brides'] },
  { id: '5', title: 'Spring Wedding Palette Mood Board', platform: 'TikTok', account: '@bloomandco', views: 54000, likes: 3200, saves: 2100, shares: 640, comments: 143, dna: 7.9, status: 'steady', postedAt: '2026-03-03', duration: '0:58', tags: ['colour', 'mood', 'spring'] },
  { id: '6', title: 'Behind the Design: Ivory & Gold Collection', platform: 'Instagram', account: '@bloom.co', views: 48000, likes: 2900, saves: 1800, shares: 540, comments: 112, dna: 7.9, status: 'steady', postedAt: '2026-03-01', duration: '1:44', tags: ['behind-scenes', 'collection'] },
  { id: '7', title: 'Why Digital Invitations Are the Future', platform: 'Facebook', account: 'Bloom & Co', views: 31000, likes: 1800, saves: 890, shares: 720, comments: 94, dna: 7.5, status: 'steady', postedAt: '2026-02-28', duration: '3:12', tags: ['opinion', 'digital', 'eco'] },
  { id: '8', title: 'Minimalist Black & White Invite Process', platform: 'TikTok', account: '@bloomandco', views: 28000, likes: 1600, saves: 980, shares: 380, comments: 76, dna: 7.3, status: 'steady', postedAt: '2026-02-25', duration: '1:23', tags: ['minimalist', 'process', 'bw'] },
  { id: '9', title: 'Etsy Order Fulfilment Walkthrough', platform: 'Instagram', account: '@bloom.co', views: 22000, likes: 1200, saves: 560, shares: 210, comments: 58, dna: 7.1, status: 'steady', postedAt: '2026-02-22', duration: '2:38', tags: ['etsy', 'process', 'business'] },
  { id: '10', title: 'Rustic Wildflower Wedding Reveal', platform: 'Pinterest', account: '@bloomandco', views: 19000, likes: 1100, saves: 2800, shares: 340, comments: 41, dna: 8.1, status: 'new', postedAt: '2026-03-15', duration: '0:41', tags: ['rustic', 'wildflower', 'reveal'] },
  { id: '11', title: 'Responding to Your Wedding Design Questions', platform: 'TikTok', account: '@bloomandco', views: 16000, likes: 940, saves: 420, shares: 180, comments: 384, dna: 7.6, status: 'new', postedAt: '2026-03-14', duration: '4:02', tags: ['qa', 'community', 'design'] },
  { id: '12', title: 'Art Deco Invitation Reveal', platform: 'Instagram', account: '@bloom.co', views: 12000, likes: 720, saves: 390, shares: 140, comments: 47, dna: 7.8, status: 'new', postedAt: '2026-03-16', duration: '0:52', tags: ['art-deco', 'reveal', 'luxury'] },
]

const platformColors: Record<string, { bg: string; text: string; border: string }> = {
  TikTok:    { bg: '#F0F0F0', text: '#1A1614', border: '#DDD5CE' },
  Instagram: { bg: '#FFF0E8', text: '#C9956B', border: '#F0D9CC' },
  Pinterest: { bg: '#F9EAEA', text: '#B85C5C', border: '#F0CECE' },
  Facebook:  { bg: '#EEF2FF', text: '#4B65C0', border: '#D0D9F5' },
}

const statusConfig: Record<StatusBadge, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  viral:    { label: 'Viral',    bg: '#F9EAEA', text: '#B85C5C', icon: <Flame size={10} /> },
  trending: { label: 'Trending', bg: '#FBF5E0', text: '#C9A940', icon: <TrendingUp size={10} /> },
  steady:   { label: 'Steady',   bg: '#F5EFE8', text: '#6B5F5A', icon: <Star size={10} /> },
  new:      { label: 'New',      bg: '#E8F5EE', text: '#4A7C59', icon: <Play size={10} /> },
}

function formatNum(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

function DnaRing({ score }: { score: number }) {
  const color = score >= 9 ? '#4A7C59' : score >= 8 ? '#C9A940' : score >= 7 ? '#C9956B' : '#B85C5C'
  const bg    = score >= 9 ? '#E8F5EE' : score >= 8 ? '#FBF5E0' : score >= 7 ? '#FFF0E8' : '#F9EAEA'
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="px-2 py-0.5 rounded-full text-[12px] font-bold" style={{ color, backgroundColor: bg }}>
        {score.toFixed(1)}
      </span>
      <span className="text-[9px] tracking-widest uppercase font-semibold" style={{ color: '#9E918C' }}>DNA</span>
    </div>
  )
}

export default function ContentLibraryPage() {
  const [platform, setPlatform] = useState('All')
  const [sortKey, setSortKey] = useState<SortKey>('views')
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'table'>('table')

  const filtered = videos
    .filter(v => platform === 'All' || v.platform === platform)
    .filter(v => !search || v.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortKey === 'views') return b.views - a.views
      if (sortKey === 'likes') return b.likes - a.likes
      if (sortKey === 'saves') return b.saves - a.saves
      if (sortKey === 'dna')   return b.dna - a.dna
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    })

  const totalViews     = videos.reduce((s, v) => s + v.views, 0)
  const totalVideos    = videos.length
  const avgDna         = (videos.reduce((s, v) => s + v.dna, 0) / videos.length).toFixed(1)
  const viralCount     = videos.filter(v => v.status === 'viral').length

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FDFAF7' }}>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#9E918C' }}>Content</p>
          <h1 className="text-[32px] font-bold font-display tracking-tight" style={{ color: '#1A1614' }}>Content Library</h1>
          <p className="text-[15px] mt-1" style={{ color: '#6B5F5A' }}>
            {totalVideos} videos across all platforms — {formatNum(totalViews)} total views
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #C9956B, #C9A96E)', color: '#fff', boxShadow: '0 2px 8px rgba(201,149,107,0.35)' }}
        >
          <Upload size={14} />
          Upload Video
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Videos', value: totalVideos, sub: 'this month' },
          { label: 'Total Views', value: formatNum(totalViews), sub: 'across all platforms' },
          { label: 'Avg DNA Score', value: avgDna, sub: 'content quality index' },
          { label: 'Viral Posts', value: viralCount, sub: `${viralCount} posts > 100k views` },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl px-5 py-4" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
            <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: '#9E918C' }}>{c.label}</p>
            <p className="text-[28px] font-bold font-display leading-none" style={{ color: '#1A1614' }}>{c.value}</p>
            <p className="text-[12px] mt-1" style={{ color: '#9E918C' }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Filter / Sort bar */}
      <div className="bg-white rounded-2xl px-5 py-4 mb-4 flex items-center gap-4 flex-wrap" style={{ border: '1px solid #EDE8E4' }}>
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search size={14} style={{ color: '#9E918C' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search videos…"
            className="bg-transparent text-[13px] outline-none w-full placeholder:text-[#C4B8B2]"
            style={{ color: '#1A1614' }}
          />
        </div>

        <div className="w-px h-5" style={{ backgroundColor: '#EDE8E4' }} />

        {/* Platform filter */}
        <div className="flex items-center gap-1.5">
          <Filter size={13} style={{ color: '#9E918C' }} />
          <div className="flex gap-1">
            {PLATFORMS.map(p => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className="px-3 py-1 rounded-full text-[12px] font-medium transition-all"
                style={platform === p
                  ? { background: '#1A1614', color: '#fff' }
                  : { background: '#F5EFE8', color: '#6B5F5A' }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-5" style={{ backgroundColor: '#EDE8E4' }} />

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <SortAsc size={13} style={{ color: '#9E918C' }} />
          <span className="text-[12px]" style={{ color: '#9E918C' }}>Sort:</span>
          {SORT_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setSortKey(s)}
              className="px-3 py-1 rounded-full text-[12px] font-medium capitalize transition-all"
              style={sortKey === s
                ? { background: '#FFF0E8', color: '#C9956B', border: '1px solid #F0D9CC' }
                : { color: '#6B5F5A' }
              }
            >
              {s}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1 text-[12px]" style={{ color: '#9E918C' }}>
          {filtered.length} results
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #F5EFE8' }}>
              {['Video', 'Platform', 'Views', 'Likes', 'Saves', 'Comments', 'DNA', 'Status', 'Posted'].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold tracking-widest uppercase" style={{ color: '#9E918C' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => {
              const pc = platformColors[v.platform]
              const sc = statusConfig[v.status]
              return (
                <tr
                  key={v.id}
                  className="group transition-colors hover:bg-[#FDFAF7] cursor-pointer"
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F5EFE8' : 'none' }}
                >
                  {/* Video title + thumbnail */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* Thumbnail placeholder */}
                      <div className="w-14 h-9 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #F5EFE8, #F0D9CC)' }}>
                        <Play size={12} style={{ color: '#C9956B' }} />
                        <span className="absolute bottom-0.5 right-1 text-[8px] font-bold" style={{ color: '#9E918C' }}>{v.duration}</span>
                      </div>
                      <div>
                        <p className="text-[13px] font-medium max-w-[220px] leading-snug" style={{ color: '#1A1614' }}>
                          {v.title}
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: '#9E918C' }}>{v.account}</p>
                      </div>
                    </div>
                  </td>
                  {/* Platform */}
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                      style={{ backgroundColor: pc.bg, color: pc.text, border: `1px solid ${pc.border}` }}>
                      {v.platform}
                    </span>
                  </td>
                  {/* Views */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Eye size={12} style={{ color: '#9E918C' }} />
                      <span className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>{formatNum(v.views)}</span>
                    </div>
                  </td>
                  {/* Likes */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Heart size={12} style={{ color: '#9E918C' }} />
                      <span className="text-[13px]" style={{ color: '#6B5F5A' }}>{formatNum(v.likes)}</span>
                    </div>
                  </td>
                  {/* Saves */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Bookmark size={12} style={{ color: '#9E918C' }} />
                      <span className="text-[13px]" style={{ color: '#6B5F5A' }}>{formatNum(v.saves)}</span>
                    </div>
                  </td>
                  {/* Comments */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <MessageCircle size={12} style={{ color: '#9E918C' }} />
                      <span className="text-[13px]" style={{ color: '#6B5F5A' }}>{formatNum(v.comments)}</span>
                    </div>
                  </td>
                  {/* DNA */}
                  <td className="px-5 py-4">
                    <DnaRing score={v.dna} />
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold w-fit"
                      style={{ backgroundColor: sc.bg, color: sc.text }}>
                      {sc.icon}
                      {sc.label}
                    </span>
                  </td>
                  {/* Date */}
                  <td className="px-5 py-4">
                    <span className="text-[12px]" style={{ color: '#9E918C' }}>
                      {new Date(v.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
