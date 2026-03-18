'use client'

import { useState } from 'react'
import {
  TrendingUp, TrendingDown, Users, Eye,
  ExternalLink, Activity, BarChart2, AlertTriangle,
} from 'lucide-react'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, Legend,
} from 'recharts'

interface Competitor {
  id: string
  name: string
  platform: string
  handle: string
  followers: number
  avgViews: number
  postingFreq: number
  engagementRate: number
  trend: 'up' | 'down' | 'flat'
  trendValue: number
  topContent: string
  strengths: string[]
  weaknesses: string[]
  threat: 'high' | 'medium' | 'low'
}

const competitors: Competitor[] = [
  { id: '1', name: 'The Papery Studio', platform: 'TikTok', handle: '@thepaperystudio', followers: 124000, avgViews: 68000, postingFreq: 5.2, engagementRate: 5.4, trend: 'up', trendValue: 12, topContent: 'Aesthetic wedding flat-lays with trending audio', strengths: ['High production value', 'Consistent aesthetic', 'Fast-growing'], weaknesses: ['No personalisation offering', 'Limited template variety'], threat: 'high' },
  { id: '2', name: 'Ivory Press Co', platform: 'Instagram', handle: '@ivorypressco', followers: 89000, avgViews: 41000, postingFreq: 7.8, engagementRate: 4.2, trend: 'up', trendValue: 8, topContent: 'Before/after invitation design reels', strengths: ['Strong Instagram presence', 'Reels strategy working well'], weaknesses: ['No TikTok presence', 'Higher price point limiting reach'], threat: 'medium' },
  { id: '3', name: 'Digital Blooms', platform: 'TikTok', handle: '@digitalbloomsinvites', followers: 62000, avgViews: 28000, postingFreq: 3.1, engagementRate: 4.8, trend: 'flat', trendValue: 1, topContent: 'Colour palette trend videos', strengths: ['Affordable pricing', 'Good SEO on Etsy'], weaknesses: ['Inconsistent posting', 'Low production quality'], threat: 'medium' },
  { id: '4', name: 'Wren & Rose Studio', platform: 'Pinterest', handle: '@wrenandrose', followers: 44000, avgViews: 52000, postingFreq: 12.0, engagementRate: 9.2, trend: 'up', trendValue: 24, topContent: 'Mood board / inspiration boards', strengths: ['Dominant on Pinterest', 'High saves rate', 'SEO-optimised boards'], weaknesses: ['No video content', 'Limited social reach'], threat: 'medium' },
  { id: '5', name: 'Blossom Invite Co', platform: 'TikTok', handle: '@blossominviteco', followers: 28000, avgViews: 14000, postingFreq: 2.4, engagementRate: 3.8, trend: 'down', trendValue: -6, topContent: 'Wedding trends commentary', strengths: ['Active community', 'Good niche focus'], weaknesses: ['Declining engagement', 'Outdated template designs', 'Slow posting cadence'], threat: 'low' },
]

const radarData = [
  { metric: 'Followers',    bloom: 78, thepaperystudio: 100, ivorypressco: 72, digitalbloomsinvites: 50 },
  { metric: 'Engagement',   bloom: 88, thepaperystudio: 70, ivorypressco: 54, digitalbloomsinvites: 62 },
  { metric: 'Avg Views',    bloom: 60, thepaperystudio: 100, ivorypressco: 60, digitalbloomsinvites: 41 },
  { metric: 'Posting Freq', bloom: 72, thepaperystudio: 80, ivorypressco: 100, digitalbloomsinvites: 40 },
  { metric: 'DNA Score',    bloom: 100, thepaperystudio: 72, ivorypressco: 60, digitalbloomsinvites: 55 },
  { metric: 'Review Score', bloom: 98, thepaperystudio: 75, ivorypressco: 70, digitalbloomsinvites: 65 },
]

const engagementData = [
  { name: 'Bloom & Co',     rate: 6.8, bar: '#C9956B' },
  { name: 'Wren & Rose',    rate: 9.2, bar: '#B8836B' },
  { name: 'The Papery',     rate: 5.4, bar: '#9E918C' },
  { name: 'Digital Blooms', rate: 4.8, bar: '#9E918C' },
  { name: 'Ivory Press',    rate: 4.2, bar: '#9E918C' },
  { name: 'Blossom Invite', rate: 3.8, bar: '#9E918C' },
]

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

const threatStyle: Record<string, { bg: string; color: string }> = {
  high:   { bg: '#F9EAEA', color: '#B85C5C' },
  medium: { bg: '#FBF5E0', color: '#C9A940' },
  low:    { bg: '#E8F5EE', color: '#4A7C59' },
}

function EngagementTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl p-3" style={{ background: '#1A1614', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p className="text-white/50 text-[11px] mb-0.5">{label}</p>
      <p className="text-white font-semibold">{payload[0].value}% eng. rate</p>
    </div>
  )
}

export default function CompetitorsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = competitors.find(c => c.id === selectedId)

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FDFAF7' }}>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#9E918C' }}>Market Intelligence</p>
        <h1 className="text-[32px] font-bold font-display tracking-tight" style={{ color: '#1A1614' }}>Competitor Tracking</h1>
        <p className="text-[15px] mt-1" style={{ color: '#6B5F5A' }}>
          {competitors.length} competitors tracked across TikTok, Instagram, and Pinterest
        </p>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Engagement comparison */}
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
          <h3 className="text-[16px] font-semibold font-display mb-1" style={{ color: '#1A1614' }}>Engagement Rate Comparison</h3>
          <p className="text-[12px] mb-4" style={{ color: '#9E918C' }}>Average engagement rate across all platforms</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={engagementData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE8E4" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#9E918C', fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6B5F5A', fontSize: 11 }} width={90} />
              <Tooltip content={<EngagementTooltip />} cursor={{ fill: '#F5EFE8' }} />
              <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                {engagementData.map((entry, i) => (
                  <Cell key={i} fill={entry.bar} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
          <h3 className="text-[16px] font-semibold font-display mb-1" style={{ color: '#1A1614' }}>Competitive Positioning</h3>
          <p className="text-[12px] mb-4" style={{ color: '#9E918C' }}>Bloom & Co vs. top 3 competitors (indexed to 100)</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
              <PolarGrid stroke="#EDE8E4" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#9E918C', fontSize: 10 }} />
              <Radar name="Bloom & Co" dataKey="bloom" stroke="#C9956B" fill="#C9956B" fillOpacity={0.25} strokeWidth={2} />
              <Radar name="The Papery" dataKey="thepaperystudio" stroke="#9E918C" fill="#9E918C" fillOpacity={0.10} strokeWidth={1} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', color: '#9E918C' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitor table */}
      <div className="bg-white rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #F5EFE8' }}>
          <h3 className="text-[16px] font-semibold font-display" style={{ color: '#1A1614' }}>Tracked Competitors</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #F5EFE8' }}>
              {['Competitor', 'Platform', 'Followers', 'Avg Views', 'Posting / wk', 'Engagement', 'Trend', 'Threat'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold tracking-widest uppercase" style={{ color: '#9E918C' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competitors.map((c, i) => {
              const ts = threatStyle[c.threat]
              return (
                <tr key={c.id}
                  onClick={() => setSelectedId(selectedId === c.id ? null : c.id)}
                  className="cursor-pointer transition-colors hover:bg-[#FDFAF7]"
                  style={{ borderBottom: i < competitors.length - 1 ? '1px solid #F5EFE8' : 'none', backgroundColor: selectedId === c.id ? '#FDFAF7' : undefined }}>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>{c.name}</p>
                      <p className="text-[11px]" style={{ color: '#9E918C' }}>{c.handle}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[12px] font-medium px-2 py-0.5 rounded-full" style={{ background: '#F5EFE8', color: '#6B5F5A' }}>{c.platform}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Users size={12} style={{ color: '#9E918C' }} />
                      <span className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>{fmt(c.followers)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Eye size={12} style={{ color: '#9E918C' }} />
                      <span className="text-[13px]" style={{ color: '#6B5F5A' }}>{fmt(c.avgViews)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="text-[13px]" style={{ color: '#6B5F5A' }}>{c.postingFreq}×</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Activity size={12} style={{ color: '#9E918C' }} />
                      <span className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>{c.engagementRate}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-[12px] font-semibold"
                      style={{ color: c.trend === 'up' ? '#4A7C59' : c.trend === 'down' ? '#B85C5C' : '#C9A940' }}>
                      {c.trend === 'up' ? <TrendingUp size={12} /> : c.trend === 'down' ? <TrendingDown size={12} /> : '—'}
                      {c.trend !== 'flat' && `${c.trendValue > 0 ? '+' : ''}${c.trendValue}%`}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize" style={ts}>{c.threat}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Competitor detail panel */}
      {selected && (
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[18px] font-semibold font-display" style={{ color: '#1A1614' }}>{selected.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[12px]" style={{ color: '#9E918C' }}>{selected.handle} on {selected.platform}</span>
                <ExternalLink size={11} style={{ color: '#9E918C' }} className="cursor-pointer" />
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize" style={threatStyle[selected.threat]}>
                  {selected.threat} threat
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: '#9E918C' }}>Top Content Type</p>
              <p className="text-[13px]" style={{ color: '#1A1614' }}>{selected.topContent}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2 flex items-center gap-1" style={{ color: '#4A7C59' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" /> Strengths
              </p>
              <ul className="space-y-1">
                {selected.strengths.map((s, i) => (
                  <li key={i} className="text-[12.5px]" style={{ color: '#6B5F5A' }}>· {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2 flex items-center gap-1" style={{ color: '#C9A940' }}>
                <AlertTriangle size={10} /> Weaknesses (your opportunities)
              </p>
              <ul className="space-y-1">
                {selected.weaknesses.map((w, i) => (
                  <li key={i} className="text-[12.5px]" style={{ color: '#6B5F5A' }}>· {w}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
