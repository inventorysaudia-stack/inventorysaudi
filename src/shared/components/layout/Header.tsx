
import { useAuth } from '../../../features/auth/hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'

export function Header() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header style={{
      height: 52,
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem',
      gap: '1rem',
    }}>
      <div style={{ flex: 1 }} />
      
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        title={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          transition: 'all 0.2s',
        }}
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        {user?.email}
      </span>
      <button
        onClick={() => logout()}
        style={{
          fontSize: 12,
          padding: '6px 12px',
          borderRadius: 8,
          border: '1px solid var(--border-color)',
          background: 'var(--bg-card)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
        }}
      >
        خروج
      </button>
    </header>
  )
}
