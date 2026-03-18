import {
  DollarSign,
  Eye,
  Users,
  ShoppingCart,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import MetricCard from '@/components/ui/MetricCard'
import RevenueChart from '@/components/charts/RevenueChart'
import PlatformChart from '@/components/charts/PlatformChart'

const topContent = [
  { title: 'Boho Garden Wedding Invite Reveal', platform: 'TikTok', views: '284k', likes: '18.2k', dna: 9.2, trend: +34 },
  { title: 'How I Design Wedding Invitations in 2025', platform: 'Instagram', views: '141k', likes: '9.8k', dna: 8.7, trend: +18 },
  { title: '5 Templates Brides Are Obsessing Over', platform: 'Pinterest', views: '98k', likes: '6.1k', dna: 8.4, trend: +12 },
  { title: 'Spring Wedding Palette Mood Board', platform: 'TikTok', views: '76k', likes: '4.4k', dna: 7.9, trend: +8 },
  { title: 'Behind The Design: Ivory & Gold Collection', platform: 'Instagram', views: '54k', likes: '3.2k', dna: 7.5, trend: +5 },
]

const platformColors: Record<string, string> = {
  TikTok: '#1A1614',
  Instagram: '#C9956B',
  Pinterest: '#B85C5C',
  Facebook: '#6B5F5A',
}

function DnaBadge({ score }: { score: number }) {
  const color = score >= 9 ? '#4A7C59' : score >= 8 ? '#C9A940' : '#C9956B'
  const bg = score >= 9 ? '#E8F5EE' : score >= 8 ? '#FBF5E0' : '#FFF0E8'
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[11px] font-bold"
      style={{ color, backgroundColor: bg }}
    >
      {score.toFixed(1)}
    </span>
  )
}

export default function OverviewPage() {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FDFAF7' }}>
      {/* Page Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#9E918C' }}>
            {dateStr}
          </p>
          <h1 className="text-[32px] font-bold font-display tracking-tight" style={{ color: '#1A1614' }}>
            Good morning, Bloom & Co
          </h1>
          <p className="text-[15px] mt-1" style={{ color: '#6B5F5A' }}>
            Here&apos;s your business performance at a glance.
          </p>
        </div>

        {/* AI Insight pill */}
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-150 hover:opacity-90 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #1A1614 0%, #2C2220 100%)',
            color: '#C9A96E',
            border: '1px solid rgba(201,169,110,0.25)',
            boxShadow: '0 2px 8px rgba(26,22,20,0.15)',
          }}
        >
          <Sparkles size={14} />
          Generate AI Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Monthly Revenue"
          value="$6,140"
          subValue="104 orders this month"
          change={26}
          changeLabel="vs last month"
          accent="rose"
          icon={<DollarSign size={16} />}
        />
        <MetricCard
          label="Total Views"
          value="2.52M"
          subValue="Across all platforms"
          change={18}
          changeLabel="vs last month"
          accent="gold"
          icon={<Eye size={16} />}
        />
        <MetricCard
          label="Total Followers"
          value="109.1k"
          subValue="+2,840 this month"
          change={8}
          changeLabel="vs last month"
          accent="neutral"
          icon={<Users size={16} />}
        />
        <MetricCard
          label="View → Sale Rate"
          value="0.041%"
          subValue="Etsy conversion funnel"
          change={3}
          changeLabel="vs last month"
          accent="success"
          icon={<ShoppingCart size={16} />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2">
          <RevenueChart />
        </div>
        <div className="col-span-1">
          <PlatformChart />
        </div>
      </div>

      {/* Top Content Table */}
      <div
        className="bg-white rounded-2xl"
        style={{
          border: '1px solid #EDE8E4',
          boxShadow: '0 1px 3px rgba(26,22,20,0.05)',
        }}
      >
        {/* Table header */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ borderBottom: '1px solid #F5EFE8' }}
        >
          <div>
            <h3 className="text-[17px] font-semibold font-display" style={{ color: '#1A1614' }}>
              Top Performing Content
            </h3>
            <p className="text-[13px] mt-0.5" style={{ color: '#9E918C' }}>
              Last 30 days — ranked by views
            </p>
          </div>
          <button
            className="flex items-center gap-1.5 text-[12px] font-semibold transition-colors hover:opacity-70"
            style={{ color: '#C9956B' }}
          >
            View all
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #F5EFE8' }}>
                {['#', 'Content', 'Platform', 'Views', 'Likes', 'DNA Score', 'Growth'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-[11px] font-semibold tracking-wider uppercase"
                    style={{ color: '#9E918C' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topContent.map((item, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-[#FDFAF7] group"
                  style={{ borderBottom: i < topContent.length - 1 ? '1px solid #F5EFE8' : 'none' }}
                >
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-bold" style={{ color: '#DDD5CE' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-[280px]">
                    <p className="text-[13.5px] font-medium truncate" style={{ color: '#1A1614' }}>
                      {item.title}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                      style={{
                        backgroundColor: `${platformColors[item.platform]}15`,
                        color: platformColors[item.platform],
                        border: `1px solid ${platformColors[item.platform]}25`,
                      }}
                    >
                      {item.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13.5px] font-semibold" style={{ color: '#1A1614' }}>
                      {item.views}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px]" style={{ color: '#6B5F5A' }}>
                      {item.likes}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <DnaBadge score={item.dna} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: '#4A7C59' }}>
                      <TrendingUp size={12} />
                      +{item.trend}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
