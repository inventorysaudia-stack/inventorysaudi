export type UUID = string

export type DocumentStatus = "DRAFT" | "POSTED" | "REVERSED"

export type MovementType =
  | "OPENING"
  | "IN"
  | "OUT"
  | "TRANSFER_IN"
  | "TRANSFER_OUT"
  | "ADJUSTMENT_IN"
  | "ADJUSTMENT_OUT"
  | "REVERSAL"

export type UserRole = "ADMIN" | "WAREHOUSE_MANAGER" | "STOREKEEPER" | "VIEWER"

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export interface ApiError {
  message: string
  code?: string
}