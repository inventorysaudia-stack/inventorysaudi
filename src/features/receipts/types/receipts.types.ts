import type { UUID, DocumentStatus } from "../../../shared/types/common.types"

export interface Receipt {
  id: UUID
  receipt_number: string
  warehouse_id: UUID
  receipt_date: string
  reference?: string
  notes?: string
  status: DocumentStatus
  created_at: string
  created_by: UUID
  posted_at?: string
  posted_by?: UUID
}

export interface ReceiptLine {
  id: UUID
  receipt_id: UUID
  item_id: UUID
  quantity: number
  unit_id: UUID
  notes?: string
}

export interface CreateReceiptInput {
  warehouse_id: UUID
  receipt_date: string
  reference?: string
  notes?: string
  lines: CreateReceiptLineInput[]
}

export interface CreateReceiptLineInput {
  item_id: UUID
  quantity: number
  unit_id: UUID
  notes?: string
}