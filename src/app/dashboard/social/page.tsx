'use client'

import { useState } from 'react'
import {
  TrendingUp, TrendingDown, Users, Eye, Heart,
  Activity, CheckCircle, AlertCircle, ExternalLink,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts'

interface Account {
  id: string
  platform: string
  handle: string
  followers: number
  following: number
  weeklyGrowth: number
  monthlyGrowth: number
  avgViews: number
  avgLikes: number
  engagementRate: number
  healthScore: number
  postsThisMonth: number
  bestTime: string
  color: string
  growthData: { week: string; followers: number; views: number }[]
  recentPosts: { title: string; views: number; likes: number; postedAt: string }[]
}

const accounts: Account[] = [
  {
    id: 'tiktok',
    platform: 'TikTok',
    handle: '@bloomandco',
    followers: 48200,
    following: 312,
    weeklyGrowth: 840,
    monthlyGrowth: 3200,
    avgViews: 41000,
    avgLikes: 2800,
    engagementRate: 6.8,
    healthScore: 87,
    postsThisMonth: 12,
    bestTime: '7–9pm',
    color: '#1A1614',
    growthData: [
      { week: 'Oct W1', followers: 31000, views: 280000 },
      { week: 'Oct W3', followers: 33400, views: 310000 },
      { week: 'Nov W1', followers: 36100, views: 360000 },
      { week: 'Nov W3', followers: 38800, views: 410000 },
      { week: 'Dec W1', followers: 41200, views: 490000 },
      { week: 'Dec W3', followers: 44000, views: 540000 },
      { week: 'Jan W1', followers: 45600, views: 560000 },
      { week: 'Jan W3', followers: 46800, views: 590000 },
      { week: 'Feb W1', followers: 47200, views: 620000 },
      { week: 'Feb W3', followers: 47800, views: 680000 },
      { week: 'Mar W1', followers: 48200, views: 720000 },
    ],
    recentPosts: [
      { title: 'Boho Garden Wedding Invite Reveal', views: 284000, likes: 18200, postedAt: '2026-03-10' },
      { title: 'How I Design Wedding Invitations in 2025', views: 98000, likes: 6100, postedAt: '2026-03-07' },
      { title: 'Minimalist Black & White Invite Process', views: 28000, likes: 1600, postedAt: '2026-02-25' },
    ],
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@bloom.co',
    followers: 32600,
    following: 891,
    weeklyGrowth: 420,
    monthlyGrowth: 1600,
    avgViews: 24000,
    avgLikes: 1800,
    engagementRate: 5.5,
    healthScore: 79,
    postsThisMonth: 18,
    bestTime: '6–8pm',
    color: '#C9956B',
    growthData: [
      { week: 'Oct W1', followers: 24000, views: 160000 },
      { week: 'Oct W3', followers: 25200, views: 175000 },
      { week: 'Nov W1', followers: 26400, views: 192000 },
      { week: 'Nov W3', followers: 27800, views: 208000 },
      { week: 'Dec W1', followers: 28900, views: 230000 },
      { week: 'Dec W3', followers: 29800, views: 252000 },
      { week: 'Jan W1', followers: 30400, views: 268000 },
      { week: 'Jan W3', followers: 31000, views: 290000 },
      { week: 'Feb W1', followers: 31600, views: 310000 },
      { week: 'Feb W3', followers: 32100, views: 330000 },
      { week: 'Mar W1', followers: 32600, views: 360000 },
    ],
    recentPosts: [
      { title: 'Boho Garden Wedding Invite Reveal', views: 141000, likes: 9800, postedAt: '2026-03-10' },
      { title: 'Behind the Design: Ivory & Gold Collection', views: 48000, likes: 2900, postedAt: '2026-03-01' },
      { title: 'Art Deco Invitation Reveal', views: 12000, likes: 720, postedAt: '2026-03-16' },
    ],
  },
  {
    id: 'pinterest',
    platform: 'Pinterest',
    handle: '@bloomandco',
    followers: 18900,
    following: 204,
    weeklyGrowth: 280,
    monthlyGrowth: 940,
    avgViews: 34000,
    avgLikes: 2100,
    engagementRate: 11.1,
    healthScore: 82,
    postsThisMonth: 22,
    bestTime: '8–10pm Sat',
    color: '#B85C5C',
    growthData: [
      { week: 'Oct W1', followers: 13200, views: 240000 },
      { week: 'Oct W3', followers: 13900, views: 270000 },
      { week: 'Nov W1', followers: 14800, views: 300000 },
      { week: 'Nov W3', followers: 15600, views: 330000 },
      { week: 'Dec W1', followers: 16400, views: 380000 },
      { week: 'Dec W3', followers: 17000, views: 400000 },
      { week: 'Jan W1', followers: 17400, views: 390000 },
      { week: 'Jan W3', followers: 17900, views: 410000 },
      { week: 'Feb W1', followers: 18200, views: 420000 },
      { week: 'Feb W3', followers: 18600, views: 415000 },
      { week: 'Mar W1', followers: 18900, views: 430000 },
    ],
    recentPosts: [
      { title: '5 Templates Brides Are Obsessing Over', views: 76000, likes: 4400, postedAt: '2026-03-05' },
      { title: 'Rustic Wildflower Wedding Reveal', views: 19000, likes: 1100, postedAt: '2026-03-15' },
      { title: 'Spring Colour Palettes 2026', views: 12400, likes: 890, postedAt: '2026-03-12' },
    ],
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    handle: 'Bloom & Co',
    followers: 9400,
    following: 0,
    weeklyGrowth: 110,
    monthlyGrowth: 380,
    avgViews: 8200,
    avgLikes: 420,
    engagementRate: 4.5,
    healthScore: 61,
    postsThisMonth: 8,
    bestTime: '12–2pm Wed',
    color: '#4B65C0',
    growthData: [
      { week: 'Oct W1', followers: 7200, views: 52000 },
      { week: 'Oct W3', followers: 7400, views: 55000 },
      { week: 'Nov W1', followers: 7700, views: 59000 },
      { week: 'Nov W3', followers: 8000, views: 64000 },
      { week: 'Dec W1', followers: 8200, views: 68000 },
      { week: 'Dec W3', followers: 8500, views: 72000 },
      { week: 'Jan W1', followers: 8700, views: 74000 },
      { week: 'Jan W3', followers: 8900, views: 76000 },
      { week: 'Feb W1', followers: 9100, views: 79000 },
      { week: 'Feb W3', followers: 9200, views: 80000 },
      { week: 'Mar W1', followers: 9400, views: 82000 },
    ],
    recentPosts: [
      { title: 'Why Digital Invitations Are the Future', views: 31000, likes: 1800, postedAt: '2026-02-28' },
      { title: 'Spring Wedding Inspiration 2026', views: 9400, likes: 520, postedAt: '2026-03-09' },
      { title: 'Wedding Planning Tips with Bloom & Co', views: 6800, likes: 340, postedAt: '2026-03-13' },
    ],
  },
]

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

function HealthRing({ score }: { score: number }) {
  const color = score >= 80 ? '#4A7C59' : score >= 65 ? '#C9A940' : '#B85C5C'
  const bg    = score >= 80 ? '#E8F5EE' : score >= 65 ? '#FBF5E0' : '#F9EAEA'
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-full flex items-center justify-center relative"
        style={{ background: `conic-gradient(${color} ${score * 3.6}deg, #F5EFE8 0deg)` }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fff' }}>
          <span className="text-[13px] font-bold" style={{ color }}>{score}</span>
        </div>
      </div>
      <span className="text-[9px] tracking-widest uppercase mt-1 font-semibold" style={{ color: '#9E918C' }}>Health</span>
    </div>
  )
}

function GrowthTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl p-3 text-sm" style={{ background: '#1A1614', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 24px rgba(26,22,20,0.3)' }}>
      <p className="text-white/50 text-[11px] mb-1">{label}</p>
      <p className="text-white font-semibold">{fmt(payload[0].value)} followers</p>
      {payload[1] && <p className="text-white/60 text-[12px]">{fmt(payload[1].value)} views</p>}
    </div>
  )
}

export default function SocialMediaPage() {
  const [selected, setSelected] = useState<string>('tiktok')
  const account = accounts.find(a => a.id === selected)!

  const totalFollowers = accounts.reduce((s, a) => s + a.followers, 0)
  const totalMonthlyGrowth = accounts.reduce((s, a) => s + a.monthlyGrowth, 0)

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FDFAF7' }}>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#9E918C' }}>Social Media</p>
        <h1 className="text-[32px] font-bold font-display tracking-tight" style={{ color: '#1A1614' }}>Account Overview</h1>
        <p className="text-[15px] mt-1" style={{ color: '#6B5F5A' }}>
          {fmt(totalFollowers)} total followers · +{fmt(totalMonthlyGrowth)} this month across all platforms
        </p>
      </div>

      {/* Platform selector cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {accounts.map(acc => (
          <button
            key={acc.id}
            onClick={() => setSelected(acc.id)}
            className="text-left p-5 rounded-2xl transition-all duration-150"
            style={{
              backgroundColor: selected === acc.id ? '#1A1614' : '#fff',
              border: selected === acc.id ? `2px solid ${acc.color}` : '1px solid #EDE8E4',
              boxShadow: selected === acc.id ? `0 4px 20px rgba(26,22,20,0.25)` : '0 1px 3px rgba(26,22,20,0.04)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] font-bold tracking-wider uppercase" style={{ color: selected === acc.id ? acc.color : '#9E918C' }}>
                  {acc.platform}
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: selected === acc.id ? 'rgba(255,255,255,0.5)' : '#9E918C' }}>
                  {acc.handle}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: acc.healthScore >= 80 ? '#E8F5EE' : acc.healthScore >= 65 ? '#FBF5E0' : '#F9EAEA', color: acc.healthScore >= 80 ? '#4A7C59' : acc.healthScore >= 65 ? '#C9A940' : '#B85C5C' }}>
                <Activity size={9} />
                {acc.healthScore}
              </div>
            </div>
            <p className="text-[24px] font-bold font-display leading-none" style={{ color: selected === acc.id ? '#fff' : '#1A1614' }}>
              {fmt(acc.followers)}
            </p>
            <div className="flex items-center gap-1 mt-1.5 text-[12px]" style={{ color: acc.monthlyGrowth > 0 ? '#4A7C59' : '#B85C5C' }}>
              <TrendingUp size={11} />
              +{fmt(acc.monthlyGrowth)} this month
            </div>
          </button>
        ))}
      </div>

      {/* Drill-down panel */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Growth chart */}
        <div className="col-span-2 bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[17px] font-semibold font-display" style={{ color: '#1A1614' }}>
                {account.platform} Growth
              </h3>
              <p className="text-[13px] mt-0.5" style={{ color: '#9E918C' }}>Follower growth, last 11 weeks</p>
            </div>
            <div className="flex items-center gap-4 text-[12px]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded inline-block" style={{ backgroundColor: account.color }} />
                <span style={{ color: '#6B5F5A' }}>Followers</span>
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={account.growthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={account.color} stopOpacity={0.20} />
                  <stop offset="100%" stopColor={account.color} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE8E4" vertical={false} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#9E918C', fontSize: 10 }} interval={2} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9E918C', fontSize: 11 }} tickFormatter={v => fmt(v)} />
              <Tooltip content={<GrowthTooltip />} cursor={{ stroke: '#EDE8E4', strokeWidth: 1 }} />
              <Area type="monotone" dataKey="followers" stroke={account.color} strokeWidth={2.5} fill="url(#growthGrad)"
                dot={{ fill: account.color, strokeWidth: 0, r: 3 }}
                activeDot={{ fill: account.color, stroke: '#F5EFE8', strokeWidth: 3, r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Account stats */}
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-5" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
          <div className="flex items-center gap-4">
            <HealthRing score={account.healthScore} />
            <div>
              <p className="text-[15px] font-semibold" style={{ color: '#1A1614' }}>{account.platform}</p>
              <p className="text-[12px]" style={{ color: '#9E918C' }}>{account.handle}</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Avg Views / Post', value: fmt(account.avgViews), icon: <Eye size={13} /> },
              { label: 'Avg Likes / Post', value: fmt(account.avgLikes), icon: <Heart size={13} /> },
              { label: 'Engagement Rate', value: `${account.engagementRate}%`, icon: <Activity size={13} /> },
              { label: 'Posts This Month', value: account.postsThisMonth, icon: <Users size={13} /> },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #F5EFE8' }}>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#9E918C' }}>{s.icon}</span>
                  <span className="text-[12px]" style={{ color: '#6B5F5A' }}>{s.label}</span>
                </div>
                <span className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>{s.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2">
              <span className="text-[12px]" style={{ color: '#6B5F5A' }}>Best Post Time</span>
              <span className="text-[12px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#FFF0E8', color: '#C9956B' }}>
                {account.bestTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent posts for selected account */}
      <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
        <h3 className="text-[16px] font-semibold font-display mb-4" style={{ color: '#1A1614' }}>
          Recent {account.platform} Posts
        </h3>
        <div className="space-y-3">
          {account.recentPosts.map((post, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-[#FDFAF7]"
              style={{ border: '1px solid #F5EFE8' }}>
              <div className="w-12 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #F5EFE8, #F0D9CC)' }}>
                <span style={{ color: '#C9956B' }} className="text-xs font-bold">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate" style={{ color: '#1A1614' }}>{post.title}</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#9E918C' }}>
                  {new Date(post.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-[12px]">
                  <Eye size={12} style={{ color: '#9E918C' }} />
                  <span style={{ color: '#1A1614' }} className="font-semibold">{fmt(post.views)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[12px]">
                  <Heart size={12} style={{ color: '#9E918C' }} />
                  <span style={{ color: '#6B5F5A' }}>{fmt(post.likes)}</span>
                </div>
                <ExternalLink size={13} style={{ color: '#9E918C' }} className="cursor-pointer hover:opacity-70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
