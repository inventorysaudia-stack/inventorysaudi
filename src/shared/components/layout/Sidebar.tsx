import { NavLink } from "react-router-dom"

const navItems = [
  { to: "/", label: "لوحة التحكم", icon: "ti-layout-dashboard", end: true },
  { to: "/receipts", label: "دخول مخزون", icon: "ti-truck-delivery" },
  { to: "/issues", label: "خروج مخزون", icon: "ti-arrow-up-right" },
  { to: "/transfers", label: "تحويل مخزون", icon: "ti-arrows-left-right" },
  { to: "/movements", label: "الحركات", icon: "ti-list" },
  { to: "/items", label: "الأصناف", icon: "ti-package" },
  { to: "/warehouses", label: "المخازن", icon: "ti-building-warehouse" },
  { to: "/inventory-count", label: "الجرد", icon: "ti-clipboard-list" },
  { to: "/reports", label: "التقارير", icon: "ti-chart-bar" },
  { to: "/users", label: "المستخدمون", icon: "ti-users" },
]

export function Sidebar() {
  return (
    <aside style={{ width: 220, background: "#0a2f26", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "1rem", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <span style={{ color: "#fff", fontWeight: 500, fontSize: 14 }}>نظام إدارة المخازن</span>
      </div>
      <nav style={{ flex: 1, padding: "0.5rem 0" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 14px",
              color: isActive ? "#fff" : "rgba(255,255,255,.65)",
              background: isActive ? "#1d9e75" : "transparent",
              textDecoration: "none",
              fontSize: 13,
            })}
          >
            <i className={`ti ${item.icon}`} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}