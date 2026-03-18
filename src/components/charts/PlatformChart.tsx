'use client'

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const platformData = [
  { platform: 'TikTok', followers: 48200, views: 1240000, color: '#1A1614', fill: '#1A1614' },
  { platform: 'Instagram', followers: 32600, views: 680000, color: '#C9956B', fill: '#C9956B' },
  { platform: 'Pinterest', followers: 18900, views: 420000, color: '#C9A96E', fill: '#C9A96E' },
  { platform: 'Facebook', followers: 9400, views: 180000, color: '#E8C9BE', fill: '#E8C9BE' },
]

const totalFollowers = platformData.reduce((s, p) => s + p.followers, 0)

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export default function PlatformChart() {
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col"
      style={{
        border: '1px solid #EDE8E4',
        boxShadow: '0 1px 3px rgba(26,22,20,0.05)',
      }}
    >
      <div className="mb-5">
        <h3
          className="text-[17px] font-semibold font-display"
          style={{ color: '#1A1614' }}
        >
          Platform Reach
        </h3>
        <p className="text-[13px] mt-0.5" style={{ color: '#9E918C' }}>
          Followers across all channels
        </p>
      </div>

      {/* Total */}
      <div className="text-center mb-2">
        <p className="text-[38px] font-bold font-display tracking-tight" style={{ color: '#1A1614' }}>
          {formatNumber(totalFollowers)}
        </p>
        <p className="text-[12px] tracking-widest uppercase font-medium" style={{ color: '#9E918C' }}>
          Total Followers
        </p>
      </div>

      {/* Platform breakdown */}
      <div className="space-y-3 mt-4">
        {platformData.map((p) => {
          const pct = Math.round((p.followers / totalFollowers) * 100)
          return (
            <div key={p.platform}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: p.color === '#E8C9BE' ? '#C9B8B0' : p.color }}
                  />
                  <span className="text-[13px] font-medium" style={{ color: '#1A1614' }}>
                    {p.platform}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px]" style={{ color: '#9E918C' }}>
                    {formatNumber(p.followers)}
                  </span>
                  <span
                    className="text-[11px] font-semibold w-10 text-right"
                    style={{ color: '#6B5F5A' }}
                  >
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#F5EFE8' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: p.color === '#E8C9BE' ? '#C9B8B0' : p.color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
