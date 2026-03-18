'use client'

import { useState } from 'react'
import {
  Sparkles, TrendingUp, AlertCircle, Lightbulb,
  MessageSquare, Star, ChevronRight, RefreshCw,
  Download, Calendar, CheckCircle, ArrowUpRight,
} from 'lucide-react'

interface Report {
  id: string
  title: string
  period: string
  createdAt: string
  summary: string
  kpis: { label: string; value: string; change: string; positive: boolean }[]
  insights: { type: 'win' | 'warning' | 'opportunity'; text: string }[]
  featureRequests: { request: string; count: number; source: string }[]
  complaints: { issue: string; count: number; fix: string; priority: 'high' | 'medium' | 'low' }[]
  contentRecs: { title: string; platform: string; rationale: string; expectedDna: number }[]
  topCommentThemes: { theme: string; count: number; sentiment: 'positive' | 'neutral' | 'negative' }[]
}

const reports: Report[] = [
  {
    id: 'mar-w3-2026',
    title: 'Weekly Report — March W3 2026',
    period: 'Mar 10 – 16, 2026',
    createdAt: '2026-03-17',
    summary: 'Exceptional week for Bloom & Co. The Boho Garden reveal post hit viral status on TikTok, driving a 34% spike in Etsy store visits and your highest-ever weekly revenue of $1,840. Audience buying intent is elevated — 14 comments this week contain direct purchase enquiries. One complaint pattern identified around Canva file access that needs addressing. Three high-potential content formats identified based on engagement analysis.',
    kpis: [
      { label: 'Weekly Revenue', value: '$1,840', change: '+34%', positive: true },
      { label: 'New Followers', value: '+1,240', change: '+18% vs prior week', positive: true },
      { label: 'Total Views', value: '628k', change: '+41%', positive: true },
      { label: 'Buying Signal Comments', value: '14', change: '+75%', positive: true },
      { label: 'Avg DNA Score', value: '8.6', change: '+0.4 vs prior week', positive: true },
      { label: 'Complaints', value: '3', change: '↑ from 1 last week', positive: false },
    ],
    insights: [
      { type: 'win', text: 'Boho Garden reveal hit 284k views — your best-ever TikTok post. The 0:47 runtime and hook-in-first-3-seconds format is clearly working. Replicate this structure in future reveals.' },
      { type: 'win', text: 'Pinterest saves-to-followers ratio is 11.1% this week — 2× industry average for home decor. Pinterest is underutilised relative to its potential; consider a dedicated Pinterest strategy.' },
      { type: 'opportunity', text: '14 comments are direct purchase enquiries. With a 48h response window before conversion probability drops 60%, approving AI reply drafts promptly is critical this week.' },
      { type: 'opportunity', text: 'Dusty blue and sage green colour palettes were mentioned in 8 comments as desired options. Adding these to your next template launch would directly address demand.' },
      { type: 'warning', text: 'Facebook engagement rate fell to 4.5% (from 5.2%). Posts on Facebook are receiving 30% fewer impressions than 4 weeks ago — recommend testing video-first content format there.' },
    ],
    featureRequests: [
      { request: 'Dusty blue / sage green colour palette', count: 8, source: 'Instagram, TikTok' },
      { request: 'Matching table menus & place cards included', count: 6, source: 'Instagram, Etsy reviews' },
      { request: 'Video tutorial for Canva editing', count: 5, source: 'Etsy reviews, TikTok' },
      { request: 'Envelope liner templates', count: 4, source: 'Pinterest, Instagram' },
      { request: 'Bilingual (English/Spanish) template option', count: 3, source: 'TikTok comments' },
    ],
    complaints: [
      { issue: 'Canva template not opening / file access issues', count: 3, fix: 'Add step-by-step Canva access guide to all listing descriptions. Create a pinned TikTok FAQ video. Offer instant PDF re-send for affected customers.', priority: 'high' },
      { issue: 'Print sizing confusion', count: 2, fix: 'Include a pre-sized print-ready PDF in every listing download. Update listing photos to show printed size reference.', priority: 'medium' },
      { issue: 'Font pairing suggestion missing', count: 1, fix: 'Add a "font guide" PDF to premium bundles with recommended Google Fonts pairings.', priority: 'low' },
    ],
    contentRecs: [
      { title: 'Dusty Blue Wedding Mood Board + Invite Reveal', platform: 'TikTok + Instagram', rationale: '8 comment requests this week, high emotional resonance content format, blue palette trending on Pinterest +22% this month.', expectedDna: 9.1 },
      { title: '"I answered your wedding design questions" (Compilation)', platform: 'TikTok', rationale: 'Q&A format averages 4× comment rate vs standard content. Your comment inbox has 140+ unanswered questions that could fuel 3–4 videos.', expectedDna: 8.4 },
      { title: 'How to customise your Canva invitation in 60 seconds', platform: 'TikTok + Instagram Reels', rationale: 'Directly addresses #3 feature request (tutorial), reduces complaint rate, and builds trust with first-time buyers. Potential for high shares.', expectedDna: 8.7 },
      { title: 'Before & after: bride\'s vision vs final invitation', platform: 'TikTok', rationale: 'Transformation content format consistently viral in the wedding niche. Add client testimonial voiceover for credibility layer.', expectedDna: 9.3 },
    ],
    topCommentThemes: [
      { theme: 'Love / obsessed / beautiful', count: 34, sentiment: 'positive' },
      { theme: 'Purchase intent / "how to buy"', count: 14, sentiment: 'positive' },
      { theme: 'Colour requests (dusty blue, sage)', count: 8, sentiment: 'neutral' },
      { theme: 'Asking about matching stationery', count: 6, sentiment: 'positive' },
      { theme: 'Canva access / technical issues', count: 3, sentiment: 'negative' },
    ],
  },
  {
    id: 'mar-w2-2026',
    title: 'Weekly Report — March W2 2026',
    period: 'Mar 3 – 9, 2026',
    createdAt: '2026-03-10',
    summary: 'Solid week with steady growth. Pinterest performance was a standout — 5 Templates post drove an unusually high save rate. Revenue grew 12% week-on-week driven by Ivory & Gold suite sales. No major complaints. One viral opportunity was missed by not reposting TikTok content to Instagram within 24h.',
    kpis: [
      { label: 'Weekly Revenue', value: '$1,374', change: '+12%', positive: true },
      { label: 'New Followers', value: '+780', change: '+8%', positive: true },
      { label: 'Total Views', value: '445k', change: '+9%', positive: true },
      { label: 'Buying Signal Comments', value: '8', change: '+33%', positive: true },
      { label: 'Avg DNA Score', value: '8.2', change: '+0.1', positive: true },
      { label: 'Complaints', value: '1', change: '↓ from 2 prior week', positive: true },
    ],
    insights: [
      { type: 'win', text: '"5 Templates" Pinterest post hit 76k views with 6.8k saves — exceptional for Pinterest. The saves-to-views ratio of 8.9% is 3× your usual rate.' },
      { type: 'opportunity', text: 'TikTok content is not being repurposed to Instagram Reels within 24h of posting. Analytics show a 40% engagement drop when the same content is posted 48h+ later.' },
      { type: 'warning', text: 'Spring wedding content is peaking on Pinterest and TikTok. You have 2–3 weeks before the seasonal trend peaks — prioritise spring-palette releases now.' },
    ],
    featureRequests: [
      { request: 'Matching envelope liners', count: 5, source: 'Pinterest, Instagram' },
      { request: 'Rustic / floral font options', count: 4, source: 'TikTok' },
      { request: 'Canva tutorial video', count: 3, source: 'Etsy reviews' },
    ],
    complaints: [
      { issue: 'Download link expiry confusion', count: 1, fix: 'Update Etsy auto-message to include instructions for accessing downloads after 48h.', priority: 'low' },
    ],
    contentRecs: [
      { title: 'Spring 2026 Wedding Invitation Trend Forecast', platform: 'TikTok + Pinterest', rationale: 'High seasonal relevance, positions brand as authority, shareable format.', expectedDna: 8.8 },
      { title: 'POV: You just ordered the perfect wedding invitation', platform: 'TikTok', rationale: 'POV format averaging 2× watch time in wedding niche. Low effort, high emotional impact.', expectedDna: 8.5 },
    ],
    topCommentThemes: [
      { theme: 'Love / beautiful', count: 28, sentiment: 'positive' },
      { theme: 'Purchase intent', count: 8, sentiment: 'positive' },
      { theme: 'Envelope/accessory requests', count: 5, sentiment: 'neutral' },
      { theme: 'Download issue', count: 1, sentiment: 'negative' },
    ],
  },
]

const priorityStyle: Record<string, { bg: string; color: string }> = {
  high:   { bg: '#F9EAEA', color: '#B85C5C' },
  medium: { bg: '#FBF5E0', color: '#C9A940' },
  low:    { bg: '#F5EFE8', color: '#6B5F5A' },
}

const themeStyle: Record<string, { bg: string; color: string }> = {
  positive: { bg: '#E8F5EE', color: '#4A7C59' },
  neutral:  { bg: '#FBF5E0', color: '#C9A940' },
  negative: { bg: '#F9EAEA', color: '#B85C5C' },
}

export default function AIReportsPage() {
  const [selectedId, setSelectedId] = useState(reports[0].id)
  const report = reports.find(r => r.id === selectedId)!

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FDFAF7' }}>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#9E918C' }}>Intelligence</p>
          <h1 className="text-[32px] font-bold font-display tracking-tight" style={{ color: '#1A1614' }}>AI Reports</h1>
          <p className="text-[15px] mt-1" style={{ color: '#6B5F5A' }}>
            Weekly intelligence reports generated every Monday at 8am
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium transition-all hover:opacity-80"
            style={{ background: '#F5EFE8', color: '#6B5F5A', border: '1px solid #EDE8E4' }}>
            <Download size={13} /> Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1A1614, #2C2220)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.25)', boxShadow: '0 2px 8px rgba(26,22,20,0.2)' }}>
            <RefreshCw size={13} /> Generate Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Report selector sidebar */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EDE8E4' }}>
            <div className="px-4 py-3" style={{ borderBottom: '1px solid #F5EFE8' }}>
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#9E918C' }}>Reports</p>
            </div>
            <div className="p-2">
              {reports.map(r => (
                <button key={r.id} onClick={() => setSelectedId(r.id)}
                  className="w-full text-left px-3 py-3 rounded-xl transition-all"
                  style={selectedId === r.id
                    ? { background: 'linear-gradient(135deg, rgba(201,149,107,0.12), rgba(201,169,110,0.08))', border: '1px solid #F0D9CC' }
                    : { background: 'transparent', border: '1px solid transparent' }
                  }>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={11} style={{ color: selectedId === r.id ? '#C9956B' : '#9E918C' }} />
                    <span className="text-[11px] font-semibold" style={{ color: selectedId === r.id ? '#C9956B' : '#9E918C' }}>
                      {r.period}
                    </span>
                  </div>
                  <p className="text-[12px] font-medium leading-snug" style={{ color: selectedId === r.id ? '#1A1614' : '#6B5F5A' }}>
                    {r.title.replace('Weekly Report — ', '')}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report content */}
        <div className="col-span-3 space-y-4">
          {/* Report header */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4', background: 'linear-gradient(135deg, #1A1614 0%, #2C2220 100%)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} style={{ color: '#C9A96E' }} />
              <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: 'rgba(201,169,110,0.8)' }}>AI Generated Report</span>
            </div>
            <h2 className="text-[22px] font-bold font-display mb-1" style={{ color: '#fff' }}>{report.title}</h2>
            <p className="text-[13px] mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{report.period} · Generated {new Date(report.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{report.summary}</p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3">
            {report.kpis.map(k => (
              <div key={k.label} className="bg-white rounded-xl p-4" style={{ border: '1px solid #EDE8E4' }}>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#9E918C' }}>{k.label}</p>
                <p className="text-[22px] font-bold font-display" style={{ color: '#1A1614' }}>{k.value}</p>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: k.positive ? '#4A7C59' : '#B85C5C' }}>{k.change}</p>
              </div>
            ))}
          </div>

          {/* Key Insights */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4' }}>
            <h3 className="text-[16px] font-semibold font-display mb-4" style={{ color: '#1A1614' }}>Key Insights</h3>
            <div className="space-y-3">
              {report.insights.map((insight, i) => {
                const cfg = insight.type === 'win'
                  ? { bg: '#E8F5EE', border: '#C3DFD0', icon: <CheckCircle size={14} style={{ color: '#4A7C59' }} />, dot: '#4A7C59' }
                  : insight.type === 'opportunity'
                  ? { bg: '#FFF0E8', border: '#F0D9CC', icon: <Lightbulb size={14} style={{ color: '#C9956B' }} />, dot: '#C9956B' }
                  : { bg: '#FBF5E0', border: '#F0E4A8', icon: <AlertCircle size={14} style={{ color: '#C9A940' }} />, dot: '#C9A940' }
                return (
                  <div key={i} className="flex gap-3 p-3.5 rounded-xl" style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}>
                    <span className="mt-0.5 flex-shrink-0">{cfg.icon}</span>
                    <p className="text-[13px] leading-relaxed" style={{ color: '#1A1614' }}>{insight.text}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Feature Requests */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4' }}>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={16} style={{ color: '#C9A96E' }} />
              <h3 className="text-[16px] font-semibold font-display" style={{ color: '#1A1614' }}>Feature Requests from Comments</h3>
            </div>
            <div className="space-y-2">
              {report.featureRequests.map((fr, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ border: '1px solid #F5EFE8', backgroundColor: '#FDFAF7' }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                    style={{ background: '#FBF5E0', color: '#C9A940' }}>{fr.count}</span>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium" style={{ color: '#1A1614' }}>{fr.request}</p>
                    <p className="text-[11px]" style={{ color: '#9E918C' }}>from {fr.source}</p>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] font-semibold transition-colors hover:opacity-70" style={{ color: '#C9956B' }}>
                    Add to roadmap <ChevronRight size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Complaints & Fixes */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4' }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={16} style={{ color: '#B85C5C' }} />
              <h3 className="text-[16px] font-semibold font-display" style={{ color: '#1A1614' }}>Complaints & Recommended Fixes</h3>
            </div>
            <div className="space-y-3">
              {report.complaints.map((c, i) => {
                const ps = priorityStyle[c.priority]
                return (
                  <div key={i} className="p-4 rounded-xl" style={{ border: '1px solid #F5EFE8', backgroundColor: '#FDFAF7' }}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                          style={{ backgroundColor: ps.bg, color: ps.color }}>{c.count}</span>
                        <p className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>{c.issue}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold capitalize flex-shrink-0"
                        style={{ backgroundColor: ps.bg, color: ps.color }}>
                        {c.priority} priority
                      </span>
                    </div>
                    <div className="ml-7 p-3 rounded-lg" style={{ background: '#fff', border: '1px solid #EDE8E4' }}>
                      <p className="text-[11px] font-semibold mb-1" style={{ color: '#4A7C59' }}>Recommended fix:</p>
                      <p className="text-[12.5px] leading-relaxed" style={{ color: '#6B5F5A' }}>{c.fix}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Content Recommendations */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4' }}>
            <div className="flex items-center gap-2 mb-4">
              <Star size={16} style={{ color: '#C9956B' }} />
              <h3 className="text-[16px] font-semibold font-display" style={{ color: '#1A1614' }}>Content Recommendations for This Week</h3>
            </div>
            <div className="space-y-3">
              {report.contentRecs.map((rec, i) => {
                const dnaColor = rec.expectedDna >= 9 ? '#4A7C59' : rec.expectedDna >= 8 ? '#C9A940' : '#C9956B'
                const dnaBg    = rec.expectedDna >= 9 ? '#E8F5EE' : rec.expectedDna >= 8 ? '#FBF5E0' : '#FFF0E8'
                return (
                  <div key={i} className="p-4 rounded-xl flex gap-4" style={{ border: '1px solid #F5EFE8', backgroundColor: '#FDFAF7' }}>
                    <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ color: dnaColor, backgroundColor: dnaBg }}>{rec.expectedDna.toFixed(1)}</span>
                      <span className="text-[8px] tracking-widest uppercase font-semibold" style={{ color: '#9E918C' }}>DNA est.</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-[13.5px] font-semibold leading-snug" style={{ color: '#1A1614' }}>{rec.title}</p>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0" style={{ background: '#FFF0E8', color: '#C9956B' }}>{rec.platform}</span>
                      </div>
                      <p className="text-[12.5px] leading-relaxed" style={{ color: '#6B5F5A' }}>{rec.rationale}</p>
                    </div>
                    <button className="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold self-center" style={{ color: '#C9956B' }}>
                      Plan <ArrowUpRight size={11} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Comment Themes */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4' }}>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={16} style={{ color: '#6B5F5A' }} />
              <h3 className="text-[16px] font-semibold font-display" style={{ color: '#1A1614' }}>Top Comment Themes This Week</h3>
            </div>
            <div className="space-y-2.5">
              {report.topCommentThemes.map((t, i) => {
                const ts = themeStyle[t.sentiment]
                const maxCount = Math.max(...report.topCommentThemes.map(x => x.count))
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-28 text-[12px] font-semibold flex-shrink-0 text-right" style={{ color: '#6B5F5A' }}>{t.count} mentions</span>
                    <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ backgroundColor: '#F5EFE8' }}>
                      <div className="h-full rounded-full flex items-center px-2.5 transition-all duration-500"
                        style={{ width: `${(t.count / maxCount) * 100}%`, backgroundColor: ts.bg }}>
                        <span className="text-[11px] font-medium truncate" style={{ color: ts.color }}>{t.theme}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold w-16 text-center flex-shrink-0"
                      style={{ backgroundColor: ts.bg, color: ts.color }}>
                      {t.sentiment}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
