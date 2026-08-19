export function parseError(error: unknown): string {
  if (error instanceof Error) return error.message

  if (typeof error === "object" && error !== null) {
    const e = error as Record<string, unknown>
    if (typeof e.message === "string") return e.message
    if (e.code === "23514") return "البيانات لا تستوفي شروط الإدخال"
    if (e.code === "23505") return "هذا السجل موجود مسبقاً"
    if (e.code === "23503") return "لا يمكن حذف هذا السجل لوجود بيانات مرتبطة به"
  }

  return "حدث خطأ غير متوقع"
}

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR")
    this.name = "ValidationError"
  }
}

export class InsufficientStockError extends AppError {
  constructor(itemName: string, available: number, requested: number) {
    super(
      `الكمية المطلوبة (${requested}) أكبر من الرصيد المتاح (${available}) للصنف: ${itemName}`,
      "INSUFFICIENT_STOCK"
    )
    this.name = "InsufficientStockError"
  }
}