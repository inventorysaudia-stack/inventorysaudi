export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("ar-EG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatCurrency(value: number, currency = "ج.م"): string {
  return `${formatNumber(value, 2)} ${currency}`
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function generateDocNumber(prefix: string, sequence: number): string {
  return `${prefix}-${new Date().getFullYear()}-${String(sequence).padStart(4, "0")}`
}