import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#FDFAF7' }}>
      <Sidebar />
      <main className="flex-1 ml-[260px] min-h-screen">
        {children}
      </main>
    </div>
  )
}
