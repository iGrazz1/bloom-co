'use client'

import { useState } from 'react'
import {
  DollarSign, ShoppingCart, Star, TrendingUp,
  Eye, Heart, Package, ExternalLink, ArrowUpRight,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts'

const revenueData = [
  { month: 'Oct', revenue: 2840, orders: 47, returns: 1 },
  { month: 'Nov', revenue: 3620, orders: 61, returns: 2 },
  { month: 'Dec', revenue: 5180, orders: 89, returns: 3 },
  { month: 'Jan', revenue: 4290, orders: 72, returns: 2 },
  { month: 'Feb', revenue: 4870, orders: 81, returns: 1 },
  { month: 'Mar', revenue: 6140, orders: 104, returns: 0 },
]

const listings = [
  { id: 1, title: 'Boho Garden Wedding Digital Invitation Suite', price: 28, sales: 234, views: 18400, favorites: 892, rating: 4.98, reviews: 186, status: 'active', revenue: 6552 },
  { id: 2, title: 'Ivory & Gold Luxury Wedding Invitation Set', price: 35, sales: 189, views: 14200, favorites: 720, rating: 4.97, reviews: 154, status: 'active', revenue: 6615 },
  { id: 3, title: 'Minimalist Black & White Wedding Suite', price: 24, sales: 167, views: 11600, favorites: 608, rating: 4.95, reviews: 138, status: 'active', revenue: 4008 },
  { id: 4, title: 'Art Deco 1920s Wedding Invitation Bundle', price: 32, sales: 142, views: 9800, favorites: 534, rating: 4.96, reviews: 118, status: 'active', revenue: 4544 },
  { id: 5, title: 'Wildflower Rustic Wedding Invitation Set', price: 26, sales: 118, views: 8400, favorites: 480, rating: 4.94, reviews: 97, status: 'active', revenue: 3068 },
  { id: 6, title: 'Spring Pastel Wedding Stationery Bundle', price: 30, sales: 96, views: 7200, favorites: 398, rating: 4.93, reviews: 81, status: 'active', revenue: 2880 },
]

const reviews = [
  { author: 'Sarah M.', rating: 5, content: 'Absolutely stunning! The design was exactly what I wanted for our garden wedding. Super easy to edit and the customer service was incredible.', date: '2026-03-14', sentiment: 'positive', listing: 'Boho Garden Suite' },
  { author: 'Emily R.', rating: 5, content: 'Perfect for our art deco themed wedding. So many compliments from guests. Will definitely be recommending to other brides!', date: '2026-03-12', sentiment: 'positive', listing: 'Art Deco Bundle' },
  { author: 'Jessica T.', rating: 4, content: 'Beautiful design but the font editing in Canva took a bit of getting used to. Would love a video tutorial included.', date: '2026-03-10', sentiment: 'neutral', listing: 'Ivory & Gold Set' },
  { author: 'Anna K.', rating: 5, content: 'The template was worth every penny. Printed beautifully and looked so professional. Our guests kept asking where we got them from!', date: '2026-03-08', sentiment: 'positive', listing: 'Minimalist Suite' },
  { author: 'Lauren B.', rating: 3, content: 'Lovely design but I struggled with the file format. Would be helpful to have more detailed setup instructions for non-designers.', date: '2026-03-06', sentiment: 'neutral', listing: 'Wildflower Set' },
]

const recentOrders = [
  { id: '#8841', listing: 'Boho Garden Suite', country: 'United States', amount: 28, status: 'completed', date: '2026-03-18' },
  { id: '#8840', listing: 'Ivory & Gold Set', country: 'United Kingdom', amount: 35, status: 'completed', date: '2026-03-18' },
  { id: '#8839', listing: 'Art Deco Bundle', country: 'Australia', amount: 32, status: 'completed', date: '2026-03-17' },
  { id: '#8838', listing: 'Minimalist Suite', country: 'Canada', amount: 24, status: 'completed', date: '2026-03-17' },
  { id: '#8837', listing: 'Spring Pastel Bundle', country: 'Ireland', amount: 30, status: 'completed', date: '2026-03-16' },
]

function fmt(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

function SentimentBadge({ s }: { s: string }) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    positive: { bg: '#E8F5EE', color: '#4A7C59', label: 'Positive' },
    neutral:  { bg: '#FBF5E0', color: '#C9A940', label: 'Neutral' },
    negative: { bg: '#F9EAEA', color: '#B85C5C', label: 'Negative' },
  }
  const cfg = styles[s]
  return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: cfg.bg, color: cfg.color }}>{cfg.label}</span>
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={11} fill={i <= Math.round(rating) ? '#C9A96E' : 'transparent'} style={{ color: '#C9A96E' }} />
      ))}
    </div>
  )
}

function RevenueTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl p-3" style={{ background: '#1A1614', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p className="text-white/50 text-[11px] mb-1">{label}</p>
      <p className="text-white font-semibold">${payload[0].value.toLocaleString()}</p>
      {payload[1] && <p className="text-white/60 text-[12px]">{payload[1].value} orders</p>}
    </div>
  )
}

export default function EtsyStorePage() {
  const [tab, setTab] = useState<'listings' | 'orders' | 'reviews'>('listings')

  const totalRevenue = revenueData.reduce((s, r) => s + r.revenue, 0)
  const totalOrders  = revenueData.reduce((s, r) => s + r.orders, 0)
  const avgOrderValue = (totalRevenue / totalOrders).toFixed(0)
  const avgRating = (listings.reduce((s, l) => s + l.rating, 0) / listings.length).toFixed(2)

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FDFAF7' }}>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#9E918C' }}>Etsy</p>
          <h1 className="text-[32px] font-bold font-display tracking-tight" style={{ color: '#1A1614' }}>Store Analytics</h1>
          <p className="text-[15px] mt-1" style={{ color: '#6B5F5A' }}>
            {listings.length} active listings · {avgRating} ★ average rating
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:opacity-90"
          style={{ background: '#F5EFE8', color: '#C9956B', border: '1px solid #F0D9CC' }}>
          <ExternalLink size={13} />
          Open Etsy Shop
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: '6-Month Revenue', value: `$${(totalRevenue / 1000).toFixed(1)}k`, sub: `${totalOrders} orders`, icon: <DollarSign size={15} />, accent: '#C9956B', accentBg: '#FFF0E8', change: '+26%' },
          { label: 'Avg Order Value', value: `$${avgOrderValue}`, sub: 'per transaction', icon: <ShoppingCart size={15} />, accent: '#C9A96E', accentBg: '#FBF5E0', change: '+4%' },
          { label: 'Store Rating', value: avgRating, sub: `${listings.reduce((s, l) => s + l.reviews, 0)} reviews`, icon: <Star size={15} />, accent: '#4A7C59', accentBg: '#E8F5EE', change: '+0.02' },
          { label: 'Total Listing Views', value: fmt(listings.reduce((s, l) => s + l.views, 0)), sub: 'last 30 days', icon: <Eye size={15} />, accent: '#6B5F5A', accentBg: '#F5EFE8', change: '+18%' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: '#9E918C' }}>{k.label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: k.accentBg, color: k.accent }}>
                {k.icon}
              </div>
            </div>
            <p className="text-[30px] font-bold font-display leading-none" style={{ color: '#1A1614' }}>{k.value}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[12px]" style={{ color: '#9E918C' }}>{k.sub}</p>
              <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: '#E8F5EE', color: '#4A7C59' }}>{k.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-[17px] font-semibold font-display" style={{ color: '#1A1614' }}>Monthly Revenue</h3>
            <p className="text-[13px] mt-0.5" style={{ color: '#9E918C' }}>6-month Etsy revenue trend</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold" style={{ background: '#E8F5EE', color: '#4A7C59' }}>
            <TrendingUp size={11} />
            +26% vs prior period
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="etsyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9956B" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#C9956B" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDE8E4" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9E918C', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9E918C', fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<RevenueTooltip />} cursor={{ stroke: '#EDE8E4', strokeWidth: 1 }} />
            <Area type="monotone" dataKey="revenue" stroke="#C9956B" strokeWidth={2.5} fill="url(#etsyGrad)"
              dot={{ fill: '#C9956B', strokeWidth: 0, r: 4 }}
              activeDot={{ fill: '#C9956B', stroke: '#FFF0E8', strokeWidth: 3, r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
        <div className="flex items-center gap-0 px-6 pt-5 pb-0" style={{ borderBottom: '1px solid #F5EFE8' }}>
          {(['listings', 'orders', 'reviews'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-2 text-[13px] font-semibold capitalize transition-all border-b-2 -mb-px"
              style={{ color: tab === t ? '#C9956B' : '#9E918C', borderBottomColor: tab === t ? '#C9956B' : 'transparent' }}>
              {t}
            </button>
          ))}
        </div>

        {/* Listings */}
        {tab === 'listings' && (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #F5EFE8' }}>
                {['Listing', 'Price', 'Sales', 'Views', 'Favorites', 'Rating', 'Revenue'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold tracking-widest uppercase" style={{ color: '#9E918C' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.map((l, i) => (
                <tr key={l.id} className="hover:bg-[#FDFAF7] transition-colors"
                  style={{ borderBottom: i < listings.length - 1 ? '1px solid #F5EFE8' : 'none' }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #F5EFE8, #F0D9CC)' }}>
                        <Package size={14} style={{ color: '#C9956B' }} />
                      </div>
                      <p className="text-[13px] font-medium max-w-[240px] leading-snug" style={{ color: '#1A1614' }}>{l.title}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>${l.price}</span></td>
                  <td className="px-5 py-4"><span className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>{l.sales}</span></td>
                  <td className="px-5 py-4"><span className="text-[13px]" style={{ color: '#6B5F5A' }}>{fmt(l.views)}</span></td>
                  <td className="px-5 py-4"><span className="text-[13px]" style={{ color: '#6B5F5A' }}>{l.favorites}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-0.5">
                      <StarRating rating={l.rating} />
                      <span className="text-[11px]" style={{ color: '#9E918C' }}>{l.rating} ({l.reviews})</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[13px] font-bold" style={{ color: '#4A7C59' }}>${l.revenue.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Orders */}
        {tab === 'orders' && (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #F5EFE8' }}>
                {['Order', 'Listing', 'Country', 'Amount', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold tracking-widest uppercase" style={{ color: '#9E918C' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <tr key={o.id} className="hover:bg-[#FDFAF7] transition-colors"
                  style={{ borderBottom: i < recentOrders.length - 1 ? '1px solid #F5EFE8' : 'none' }}>
                  <td className="px-5 py-4"><span className="text-[12px] font-mono font-semibold" style={{ color: '#C9956B' }}>{o.id}</span></td>
                  <td className="px-5 py-4"><p className="text-[13px] max-w-[200px] truncate" style={{ color: '#1A1614' }}>{o.listing}</p></td>
                  <td className="px-5 py-4"><span className="text-[13px]" style={{ color: '#6B5F5A' }}>{o.country}</span></td>
                  <td className="px-5 py-4"><span className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>${o.amount}</span></td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: '#E8F5EE', color: '#4A7C59' }}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-4"><span className="text-[12px]" style={{ color: '#9E918C' }}>{new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Reviews */}
        {tab === 'reviews' && (
          <div className="p-6 space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ border: '1px solid #F5EFE8', backgroundColor: '#FDFAF7' }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold"
                      style={{ background: 'linear-gradient(135deg, #F5E6E0, #F0D9CC)', color: '#C9956B' }}>
                      {r.author[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>{r.author}</p>
                      <StarRating rating={r.rating} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#F5EFE8', color: '#9E918C' }}>{r.listing}</span>
                    <SentimentBadge s={r.sentiment} />
                    <span className="text-[11px]" style={{ color: '#9E918C' }}>{new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: '#6B5F5A' }}>{r.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
