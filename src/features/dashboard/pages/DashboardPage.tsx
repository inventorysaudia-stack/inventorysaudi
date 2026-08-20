
import { useAuth } from '../../auth/hooks/useAuth'

export function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    { label: 'إجمالي الأصناف', value: '1,235', icon: '📦', color: '#185fa5' },
    { label: 'إجمالي الدخول', value: '450,230', icon: '📥', color: '#0f6e56' },
    { label: 'إجمالي الخروج', value: '320,150', icon: '📤', color: '#854f0b' },
    { label: 'قيمة المخزون', value: '1,245,850', icon: '💰', color: '#534ab7' },
  ]

  const movements = [
    { type: 'دخول', item: 'دهان أبيض 20 لتر', qty: '+50', wh: 'المخزن الرئيسي', color: 'var(--badge-in-color)', bg: 'var(--badge-in-bg)' },
    { type: 'خروج', item: 'مسامير 6 مم', qty: '-200', wh: 'مخزن المشروع', color: 'var(--badge-out-color)', bg: 'var(--badge-out-bg)' },
    { type: 'تحويل', item: 'كابل كهرباء 2.5 مم', qty: '150', wh: 'الرئيسي←الفرع', color: 'var(--badge-transfer-color)', bg: 'var(--badge-transfer-bg)' },
  ]

  return (
    <div dir="rtl">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: 'var(--text-primary)' }}>لوحة التحكم</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>مرحباً {user?.email}</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            padding: 16,
            boxShadow: 'var(--shadow)',
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: 'var(--text-primary)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Movements */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 12,
        padding: 16,
        boxShadow: 'var(--shadow)',
      }}>
        <h2 style={{ fontSize: 14, fontWeight: 500, marginBottom: 14, color: 'var(--text-primary)' }}>آخر الحركات</h2>
        {movements.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 0',
            borderBottom: i < movements.length - 1 ? '1px solid var(--border-color)' : 'none',
          }}>
            <span style={{ background: m.bg, color: m.color, padding: '2px 10px', borderRadius: 100, fontSize: 11, fontWeight: 500 }}>
              {m.type}
            </span>
            <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{m.item}</span>
            <span style={{ fontWeight: 500, color: m.color }}>{m.qty}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.wh}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
