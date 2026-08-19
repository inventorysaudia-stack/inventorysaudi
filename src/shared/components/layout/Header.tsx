import { useAuth } from "../../../features/auth/hooks/useAuth"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header style={{
      height: 52,
      background: "var(--surface-2, #fff)",
      borderBottom: "0.5px solid var(--border, #e5e5e5)",
      display: "flex",
      alignItems: "center",
      padding: "0 1rem",
      gap: "1rem",
    }}>
      <div style={{ flex: 1 }} />
      <span style={{ fontSize: 13, color: "var(--text-secondary, #666)" }}>
        {user?.email}
      </span>
      <button
        onClick={() => logout()}
        style={{ fontSize: 12, cursor: "pointer", background: "none", border: "none", color: "var(--text-secondary, #666)" }}
      >
        خروج
      </button>
    </header>
  )
}