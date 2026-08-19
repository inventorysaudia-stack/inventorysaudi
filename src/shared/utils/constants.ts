export const MOVEMENT_TYPES = {
  OPENING: { label: "رصيد افتتاحي", color: "neutral" },
  IN: { label: "دخول", color: "success" },
  OUT: { label: "خروج", color: "danger" },
  TRANSFER_IN: { label: "تحويل وارد", color: "accent" },
  TRANSFER_OUT: { label: "تحويل صادر", color: "accent" },
  ADJUSTMENT_IN: { label: "تسوية زيادة", color: "warning" },
  ADJUSTMENT_OUT: { label: "تسوية نقص", color: "warning" },
  REVERSAL: { label: "عكس حركة", color: "danger" },
} as const

export const DOCUMENT_STATUS = {
  DRAFT: { label: "مسودة", color: "neutral" },
  POSTED: { label: "مرحّل", color: "success" },
  REVERSED: { label: "معكوس", color: "danger" },
} as const

export const USER_ROLES = {
  ADMIN: { label: "مدير النظام" },
  WAREHOUSE_MANAGER: { label: "مدير المخزن" },
  STOREKEEPER: { label: "أمين المخزن" },
  VIEWER: { label: "مشاهد فقط" },
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const