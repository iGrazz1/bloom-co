'use client'

import { useState, useMemo } from 'react'
import {
  Target, ChevronRight, Zap,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'

// Current baseline metrics
const BASELINE = {
  monthlyRevenue: 6140,
  videosPerMonth: 10,
  viewsPerVideo: 41000,
  etsyConversionRate: 0.041,   // % of views that visit Etsy
  etsyPurchaseRate: 0.12,       // % of Etsy visitors that buy
  avgOrderValue: 29.5,
}

function calcMonthlyRevenue(params: {
  videosPerMonth: number
  viewsPerVideoMultiplier: number
  conversionMultiplier: number
  aov: number
}) {
  const views = params.videosPerMonth * BASELINE.viewsPerVideo * params.viewsPerVideoMultiplier
  const etsyVisits = views * (BASELINE.etsyConversionRate * params.conversionMultiplier)
  const orders = etsyVisits * BASELINE.etsyPurchaseRate
  return orders * params.aov
}

const MILESTONES = [
  { label: '$5k / month', amount: 5000 },
  { label: '$10k / month', amount: 10000 },
  { label: '$50k / month', amount: 50000 },
  { label: '$100k / year', amount: 100000 / 12 },
  { label: '$500k / year', amount: 500000 / 12 },
  { label: '$1M / year', amount: 1000000 / 12 },
]

function formatCurrency(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${n.toFixed(0)}`
}

function ScenarioTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl p-3" style={{ background: '#1A1614', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 24px rgba(26,22,20,0.3)' }}>
      <p className="text-white/50 text-[11px] mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-[12px]">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>{p.name}:</span>
          <span className="text-white font-semibold">{formatCurrency(p.value)}/mo</span>
        </div>
      ))}
    </div>
  )
}

function Slider({ label, value, min, max, step, onChange, unit, description }: {
  label: string; value: number; min: number; max: number; step: number
  onChange: (v: number) => void; unit: string; description: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>{label}</p>
          <p className="text-[11px]" style={{ color: '#9E918C' }}>{description}</p>
        </div>
        <span className="text-[18px] font-bold font-display px-3 py-1 rounded-lg" style={{ color: '#C9956B', background: '#FFF0E8' }}>
          {unit === '$' ? `${unit}${value}` : `${value}${unit}`}
        </span>
      </div>
      <div className="relative h-6 flex items-center">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #C9956B ${((value - min) / (max - min)) * 100}%, #EDE8E4 0%)`,
            WebkitAppearance: 'none',
          }}
        />
      </div>
      <div className="flex justify-between text-[10px]" style={{ color: '#9E918C' }}>
        <span>{unit === '$' ? `${unit}${min}` : `${min}${unit}`}</span>
        <span>{unit === '$' ? `${unit}${max}` : `${max}${unit}`}</span>
      </div>
    </div>
  )
}

export default function ForecastPage() {
  // Scenario A (Conservative — current-ish)
  const [aVideos, setAVideos] = useState(10)
  const [aViewMulti, setAViewMulti] = useState(1.0)
  const [aConvMulti, setAConvMulti] = useState(1.0)
  const [aAov, setAAov] = useState(29.5)

  // Scenario B (Optimistic)
  const [bVideos, setBVideos] = useState(20)
  const [bViewMulti, setBViewMulti] = useState(1.5)
  const [bConvMulti, setBConvMulti] = useState(1.3)
  const [bAov, setBAov] = useState(34)

  // Scenario C (Aggressive)
  const [cVideos, setCVideos] = useState(30)
  const [cViewMulti, setCViewMulti] = useState(2.0)
  const [cConvMulti, setCConvMulti] = useState(1.6)
  const [cAov, setCAov] = useState(38)

  const calcScenario = (videos: number, viewMulti: number, convMulti: number, aov: number) =>
    calcMonthlyRevenue({ videosPerMonth: videos, viewsPerVideoMultiplier: viewMulti, conversionMultiplier: convMulti, aov })

  const scenarioA = calcScenario(aVideos, aViewMulti, aConvMulti, aAov)
  const scenarioB = calcScenario(bVideos, bViewMulti, bConvMulti, bAov)
  const scenarioC = calcScenario(cVideos, cViewMulti, cConvMulti, cAov)

  // Build 12-month projection data
  const projectionData = useMemo(() => {
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
    return months.map((month, i) => {
      const growthFactor = 1 + i * 0.04 // organic compounding
      return {
        month,
        conservative: Math.round(scenarioA * Math.pow(1 + 0.02, i)),
        optimistic: Math.round(scenarioB * Math.pow(1 + 0.05, i)),
        aggressive: Math.round(scenarioC * Math.pow(1 + 0.08, i)),
      }
    })
  }, [scenarioA, scenarioB, scenarioC])

  const annualA = projectionData.reduce((s, d) => s + d.conservative, 0)
  const annualB = projectionData.reduce((s, d) => s + d.optimistic, 0)
  const annualC = projectionData.reduce((s, d) => s + d.aggressive, 0)

  // Milestone calculations
  const monthsToMilestone = (target: number) => {
    for (let i = 0; i < projectionData.length; i++) {
      if (projectionData[i].optimistic >= target) return i + 1
    }
    return null
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FDFAF7' }}>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#9E918C' }}>Planning</p>
          <h1 className="text-[32px] font-bold font-display tracking-tight" style={{ color: '#1A1614' }}>Revenue Forecast</h1>
          <p className="text-[15px] mt-1" style={{ color: '#6B5F5A' }}>
            Scenario modelling — adjust inputs to project your path to growth
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold"
          style={{ background: '#FFF0E8', color: '#C9956B', border: '1px solid #F0D9CC' }}>
          <span>Current MRR: </span>
          <span className="font-bold">{formatCurrency(BASELINE.monthlyRevenue)}</span>
        </div>
      </div>

      {/* Scenario output cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Conservative', value: scenarioA, annual: annualA, color: '#6B5F5A', bg: '#F5EFE8', border: '#EDE8E4', tag: 'Current pace + small improvements' },
          { label: 'Optimistic', value: scenarioB, annual: annualB, color: '#C9956B', bg: '#FFF0E8', border: '#F0D9CC', tag: '2× content + better conversion' },
          { label: 'Aggressive', value: scenarioC, annual: annualC, color: '#4A7C59', bg: '#E8F5EE', border: '#C3DFD0', tag: '3× content + full optimisation' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-6" style={{ border: `2px solid ${s.border}`, boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: '#9E918C' }}>{s.label}</p>
            <p className="text-[11px] mb-3 px-2 py-0.5 rounded-full w-fit" style={{ background: s.bg, color: s.color }}>{s.tag}</p>
            <p className="text-[36px] font-bold font-display leading-none" style={{ color: '#1A1614' }}>
              {formatCurrency(s.value)}
            </p>
            <p className="text-[12px] mt-1" style={{ color: '#9E918C' }}>per month</p>
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid #F5EFE8' }}>
              <p className="text-[12px]" style={{ color: '#9E918C' }}>
                Projected annual: <span className="font-bold" style={{ color: '#1A1614' }}>{formatCurrency(s.annual)}</span>
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: s.color }}>
                {s.value > BASELINE.monthlyRevenue
                  ? `+${Math.round((s.value / BASELINE.monthlyRevenue - 1) * 100)}% vs current`
                  : 'At current pace'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Projection chart */}
      <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-[17px] font-semibold font-display" style={{ color: '#1A1614' }}>12-Month Revenue Projection</h3>
            <p className="text-[13px] mt-0.5" style={{ color: '#9E918C' }}>Apr 2026 – Mar 2027 (with compound growth)</p>
          </div>
          <div className="flex items-center gap-4 text-[12px]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded inline-block" style={{ background: '#9E918C' }} /><span style={{ color: '#6B5F5A' }}>Conservative</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded inline-block" style={{ background: '#C9956B' }} /><span style={{ color: '#6B5F5A' }}>Optimistic</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded inline-block" style={{ background: '#4A7C59' }} /><span style={{ color: '#6B5F5A' }}>Aggressive</span></span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={projectionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9E918C" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#9E918C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9956B" stopOpacity={0.20} />
                <stop offset="100%" stopColor="#C9956B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A7C59" stopOpacity={0.20} />
                <stop offset="100%" stopColor="#4A7C59" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDE8E4" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9E918C', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9E918C', fontSize: 11 }} tickFormatter={v => formatCurrency(v)} />
            <Tooltip content={<ScenarioTooltip />} cursor={{ stroke: '#EDE8E4', strokeWidth: 1 }} />
            {/* Reference lines for key milestones */}
            <ReferenceLine y={10000} stroke="#C9A96E" strokeDasharray="4 4" strokeOpacity={0.6} label={{ value: '$10k', position: 'right', fill: '#C9A96E', fontSize: 10 }} />
            <ReferenceLine y={50000} stroke="#4A7C59" strokeDasharray="4 4" strokeOpacity={0.5} label={{ value: '$50k', position: 'right', fill: '#4A7C59', fontSize: 10 }} />
            <Area type="monotone" dataKey="conservative" name="Conservative" stroke="#9E918C" strokeWidth={1.5} fill="url(#gradA)" dot={false} />
            <Area type="monotone" dataKey="optimistic" name="Optimistic" stroke="#C9956B" strokeWidth={2.5} fill="url(#gradB)" dot={false} />
            <Area type="monotone" dataKey="aggressive" name="Aggressive" stroke="#4A7C59" strokeWidth={2} fill="url(#gradC)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Sliders + Milestones */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Conservative sliders */}
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4' }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full" style={{ background: '#9E918C' }} />
            <h3 className="text-[15px] font-semibold font-display" style={{ color: '#1A1614' }}>Conservative</h3>
          </div>
          <div className="space-y-5">
            <Slider label="Videos / month" value={aVideos} min={4} max={30} step={1} onChange={setAVideos} unit="×" description="Content pieces published" />
            <Slider label="View multiplier" value={aViewMulti} min={0.5} max={3} step={0.1} onChange={setAViewMulti} unit="×" description="Relative to current avg views" />
            <Slider label="Conversion multiplier" value={aConvMulti} min={0.5} max={3} step={0.1} onChange={setAConvMulti} unit="×" description="CTR improvement vs baseline" />
            <Slider label="Avg order value" value={aAov} min={20} max={60} step={0.5} onChange={setAAov} unit="$" description="Average Etsy sale price" />
          </div>
        </div>

        {/* Optimistic sliders */}
        <div className="bg-white rounded-2xl p-6" style={{ border: '2px solid #F0D9CC' }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full" style={{ background: '#C9956B' }} />
            <h3 className="text-[15px] font-semibold font-display" style={{ color: '#1A1614' }}>Optimistic</h3>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold ml-auto" style={{ background: '#FFF0E8', color: '#C9956B' }}>Recommended</span>
          </div>
          <div className="space-y-5">
            <Slider label="Videos / month" value={bVideos} min={4} max={30} step={1} onChange={setBVideos} unit="×" description="Content pieces published" />
            <Slider label="View multiplier" value={bViewMulti} min={0.5} max={3} step={0.1} onChange={setBViewMulti} unit="×" description="Relative to current avg views" />
            <Slider label="Conversion multiplier" value={bConvMulti} min={0.5} max={3} step={0.1} onChange={setBConvMulti} unit="×" description="CTR improvement vs baseline" />
            <Slider label="Avg order value" value={bAov} min={20} max={60} step={0.5} onChange={setBAov} unit="$" description="Average Etsy sale price" />
          </div>
        </div>

        {/* Aggressive sliders */}
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #C3DFD0' }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full" style={{ background: '#4A7C59' }} />
            <h3 className="text-[15px] font-semibold font-display" style={{ color: '#1A1614' }}>Aggressive</h3>
            <Zap size={12} style={{ color: '#4A7C59' }} className="ml-auto" />
          </div>
          <div className="space-y-5">
            <Slider label="Videos / month" value={cVideos} min={4} max={30} step={1} onChange={setCVideos} unit="×" description="Content pieces published" />
            <Slider label="View multiplier" value={cViewMulti} min={0.5} max={3} step={0.1} onChange={setCViewMulti} unit="×" description="Relative to current avg views" />
            <Slider label="Conversion multiplier" value={cConvMulti} min={0.5} max={3} step={0.1} onChange={setCConvMulti} unit="×" description="CTR improvement vs baseline" />
            <Slider label="Avg order value" value={cAov} min={20} max={60} step={0.5} onChange={setCAov} unit="$" description="Average Etsy sale price" />
          </div>
        </div>
      </div>

      {/* Milestone Tracker */}
      <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EDE8E4', boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>
        <div className="flex items-center gap-2 mb-5">
          <Target size={16} style={{ color: '#C9956B' }} />
          <h3 className="text-[17px] font-semibold font-display" style={{ color: '#1A1614' }}>Revenue Milestones</h3>
          <span className="text-[12px] ml-2" style={{ color: '#9E918C' }}>Based on optimistic scenario with compound growth</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {MILESTONES.map(m => {
            const monthsNeeded = monthsToMilestone(m.amount)
            const isAlreadyReached = BASELINE.monthlyRevenue >= m.amount
            const isReachable = monthsNeeded !== null
            return (
              <div key={m.label} className="p-4 rounded-xl" style={{
                border: `1px solid ${isAlreadyReached ? '#C3DFD0' : isReachable ? '#F0D9CC' : '#EDE8E4'}`,
                backgroundColor: isAlreadyReached ? '#E8F5EE' : isReachable ? '#FFF0E8' : '#FDFAF7',
              }}>
                <p className="text-[11px] font-bold tracking-widest uppercase mb-1"
                  style={{ color: isAlreadyReached ? '#4A7C59' : isReachable ? '#C9956B' : '#9E918C' }}>
                  {isAlreadyReached ? '✓ Achieved' : isReachable ? 'On track' : 'Beyond horizon'}
                </p>
                <p className="text-[17px] font-bold font-display" style={{ color: '#1A1614' }}>{m.label}</p>
                <p className="text-[12px] mt-1" style={{ color: '#6B5F5A' }}>
                  {isAlreadyReached ? 'Current baseline exceeds this milestone'
                    : isReachable ? `~${monthsNeeded} month${monthsNeeded === 1 ? '' : 's'} away in optimistic scenario`
                    : 'Requires inputs beyond 12-month window'}
                </p>
              </div>
            )
          })}
        </div>

        {/* Revenue funnel */}
        <div className="mt-6 p-5 rounded-xl" style={{ background: '#FDFAF7', border: '1px solid #EDE8E4' }}>
          <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: '#9E918C' }}>Revenue Funnel (Optimistic Scenario)</p>
          <div className="flex items-center gap-2 text-[12px] flex-wrap">
            {[
              { label: `${bVideos} videos`, sub: 'per month' },
              { label: `${(bVideos * BASELINE.viewsPerVideo * bViewMulti / 1000).toFixed(0)}k views`, sub: 'total reach' },
              { label: `${(bVideos * BASELINE.viewsPerVideo * bViewMulti * BASELINE.etsyConversionRate * bConvMulti).toFixed(0)} Etsy visits`, sub: `${(BASELINE.etsyConversionRate * bConvMulti * 100).toFixed(2)}% CTR` },
              { label: `${(bVideos * BASELINE.viewsPerVideo * bViewMulti * BASELINE.etsyConversionRate * bConvMulti * BASELINE.etsyPurchaseRate).toFixed(0)} orders`, sub: `${(BASELINE.etsyPurchaseRate * 100).toFixed(0)}% purchase rate` },
              { label: formatCurrency(scenarioB), sub: 'monthly revenue' },
            ].map((step, i, arr) => (
              <div key={step.label} className="contents">
                <div className="flex flex-col items-center px-3 py-2 rounded-lg" style={{ background: '#fff', border: '1px solid #EDE8E4' }}>
                  <span className="font-bold" style={{ color: '#C9956B' }}>{step.label}</span>
                  <span style={{ color: '#9E918C' }}>{step.sub}</span>
                </div>
                {i < arr.length - 1 && <ChevronRight size={14} style={{ color: '#DDD5CE', flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
