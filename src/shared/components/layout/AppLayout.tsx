
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useTheme } from '../../hooks/useTheme'

export function AppLayout() {
  useTheme() // Initialize theme on mount

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      direction: 'rtl',
      background: 'var(--bg-secondary)',
    }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          background: 'var(--bg-secondary)',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
