import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  subValue?: string
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  accent?: 'rose' | 'gold' | 'success' | 'neutral'
}

const accentStyles = {
  rose: {
    iconBg: '#FFF0E8',
    iconColor: '#C9956B',
    border: '#F0D9CC',
  },
  gold: {
    iconBg: '#FBF5E0',
    iconColor: '#C9A96E',
    border: '#F0E4C8',
  },
  success: {
    iconBg: '#E8F5EE',
    iconColor: '#4A7C59',
    border: '#C3DFD0',
  },
  neutral: {
    iconBg: '#F5EFE8',
    iconColor: '#6B5F5A',
    border: '#EDE8E4',
  },
}

export default function MetricCard({
  label,
  value,
  subValue,
  change,
  changeLabel,
  icon,
  accent = 'rose',
}: MetricCardProps) {
  const styles = accentStyles[accent]

  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0

  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:shadow-lg group"
      style={{
        border: `1px solid #EDE8E4`,
        boxShadow: '0 1px 3px rgba(26,22,20,0.05), 0 1px 2px rgba(26,22,20,0.03)',
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: '#9E918C' }}>
            {label}
          </p>
        </div>
        {icon && (
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: styles.iconBg, color: styles.iconColor, border: `1px solid ${styles.border}` }}
          >
            {icon}
          </div>
        )}
      </div>

      <div>
        <p
          className="text-[32px] font-bold leading-none tracking-tight font-display"
          style={{ color: '#1A1614' }}
        >
          {value}
        </p>
        {subValue && (
          <p className="text-[13px] mt-1" style={{ color: '#9E918C' }}>
            {subValue}
          </p>
        )}
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] font-semibold"
            style={{
              backgroundColor: isPositive ? '#E8F5EE' : isNegative ? '#F9EAEA' : '#F5EFE8',
              color: isPositive ? '#4A7C59' : isNegative ? '#B85C5C' : '#6B5F5A',
            }}
          >
            {isPositive ? (
              <TrendingUp size={11} />
            ) : isNegative ? (
              <TrendingDown size={11} />
            ) : (
              <Minus size={11} />
            )}
            {isPositive ? '+' : ''}{change}%
          </div>
          {changeLabel && (
            <span className="text-[12px]" style={{ color: '#9E918C' }}>
              {changeLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
