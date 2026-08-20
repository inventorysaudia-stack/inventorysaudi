
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'لوحة التحكم', icon: '🏠', end: true },
  { to: '/receipts', label: 'دخول مخزون', icon: '📥' },
  { to: '/issues', label: 'خروج مخزون', icon: '📤' },
  { to: '/transfers', label: 'تحويل مخزون', icon: '🔄' },
  { to: '/movements', label: 'الحركات', icon: '📋' },
  { to: '/items', label: 'الأصناف', icon: '📦' },
  { to: '/warehouses', label: 'المخازن', icon: '🏭' },
  { to: '/inventory-count', label: 'الجرد', icon: '📊' },
  { to: '/reports', label: 'التقارير', icon: '📈' },
  { to: '/users', label: 'المستخدمون', icon: '👥' },
]

export function Sidebar() {
  return (
    <aside style={{
      width: 220,
      background: 'var(--bg-sidebar)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      <div style={{
        padding: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{ fontSize: 24 }}>🏭</span>
        <div>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>نظام إدارة المخازن</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>v1.0</div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 14px',
              color: isActive ? 'var(--text-sidebar-active)' : 'var(--text-sidebar)',
              background: isActive ? 'var(--bg-sidebar-active)' : 'transparent',
              textDecoration: 'none',
              fontSize: 13,
              transition: 'all 0.15s',
            })}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
