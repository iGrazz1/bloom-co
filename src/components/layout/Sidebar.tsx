'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Video,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  Users,
  TrendingUp,
  Globe,
  Settings,
  FlowerIcon,
} from 'lucide-react'

const navItems = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Content Library',
    href: '/dashboard/content',
    icon: Video,
  },
  {
    label: 'Social Media',
    href: '/dashboard/social',
    icon: Globe,
  },
  {
    label: 'Etsy Store',
    href: '/dashboard/etsy',
    icon: ShoppingBag,
  },
  {
    label: 'Comments & Sentiment',
    href: '/dashboard/comments',
    icon: MessageCircle,
  },
  {
    label: 'AI Reports',
    href: '/dashboard/reports',
    icon: Sparkles,
  },
  {
    label: 'Competitors',
    href: '/dashboard/competitors',
    icon: Users,
  },
  {
    label: 'Revenue Forecast',
    href: '/dashboard/forecast',
    icon: TrendingUp,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[260px] flex flex-col z-40"
      style={{ background: 'linear-gradient(180deg, #1A1614 0%, #2C2220 100%)' }}
    >
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #C9956B 0%, #C9A96E 100%)' }}
          >
            <FlowerIcon size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-[15px] leading-tight tracking-wide font-display">
              Bloom & Co
            </p>
            <p className="text-white/40 text-[11px] tracking-widest uppercase mt-0.5">
              Analytics
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-white/30 text-[10px] tracking-widest uppercase px-3 mb-3 font-medium">
          Dashboard
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium
                    transition-all duration-150 group relative
                    ${isActive
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/[0.05]'
                    }
                  `}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'linear-gradient(135deg, rgba(201,149,107,0.20) 0%, rgba(201,169,110,0.12) 100%)' }}
                    />
                  )}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                      style={{ background: 'linear-gradient(180deg, #C9956B, #C9A96E)' }}
                    />
                  )}
                  <Icon
                    size={16}
                    className={`relative flex-shrink-0 transition-colors ${
                      isActive ? 'text-rose' : 'text-white/40 group-hover:text-white/60'
                    }`}
                    style={isActive ? { color: '#C9956B' } : {}}
                  />
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-6 border-t border-white/[0.06] pt-4">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-all duration-150"
        >
          <Settings size={16} className="text-white/30" />
          Settings
        </Link>
        <div className="mt-4 px-3">
          <div className="rounded-lg p-3" style={{ background: 'rgba(201,149,107,0.12)', border: '1px solid rgba(201,149,107,0.20)' }}>
            <p className="text-white/70 text-[11px] leading-relaxed">
              <span style={{ color: '#C9A96E' }} className="font-semibold">AI Reports</span> run every Monday at 8am.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
