'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Oct', revenue: 2840, orders: 47 },
  { month: 'Nov', revenue: 3620, orders: 61 },
  { month: 'Dec', revenue: 5180, orders: 89 },
  { month: 'Jan', revenue: 4290, orders: 72 },
  { month: 'Feb', revenue: 4870, orders: 81 },
  { month: 'Mar', revenue: 6140, orders: 104 },
]

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-xl p-3 text-sm"
      style={{
        background: '#1A1614',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 24px rgba(26,22,20,0.3)',
      }}
    >
      <p className="text-white/50 text-[11px] tracking-wider uppercase mb-1">{label}</p>
      <p className="text-white font-semibold text-[15px]">
        ${payload[0].value.toLocaleString()}
      </p>
      {payload[1] && (
        <p className="text-white/60 text-[12px] mt-0.5">
          {payload[1].value} orders
        </p>
      )}
    </div>
  )
}

export default function RevenueChart() {
  return (
    <div
      className="bg-white rounded-2xl p-6"
      style={{
        border: '1px solid #EDE8E4',
        boxShadow: '0 1px 3px rgba(26,22,20,0.05)',
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3
            className="text-[17px] font-semibold font-display"
            style={{ color: '#1A1614' }}
          >
            Revenue Overview
          </h3>
          <p className="text-[13px] mt-0.5" style={{ color: '#9E918C' }}>
            Monthly Etsy revenue, last 6 months
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold" style={{ background: '#E8F5EE', color: '#4A7C59' }}>
          +26.0% vs last period
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9956B" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#C9956B" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#EDE8E4"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9E918C', fontSize: 12, fontFamily: 'var(--font-geist-sans)' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9E918C', fontSize: 11, fontFamily: 'var(--font-geist-sans)' }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#EDE8E4', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#C9956B"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            dot={{ fill: '#C9956B', strokeWidth: 0, r: 4 }}
            activeDot={{ fill: '#C9956B', stroke: '#FFF0E8', strokeWidth: 3, r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
