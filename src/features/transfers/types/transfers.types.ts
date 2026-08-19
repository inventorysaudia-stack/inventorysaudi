import type { UUID, DocumentStatus } from "../../../shared/types/common.types"

export interface Transfer {
  id: UUID
  transfer_number: string
  from_warehouse_id: UUID
  to_warehouse_id: UUID
  transfer_date: string
  notes?: string
  status: DocumentStatus
  created_at: string
  created_by: UUID
  posted_at?: string
  posted_by?: UUID
}

export interface TransferLine {
  id: UUID
  transfer_id: UUID
  item_id: UUID
  quantity: number
  unit_id: UUID
  notes?: string
}

export interface CreateTransferInput {
  from_warehouse_id: UUID
  to_warehouse_id: UUID
  transfer_date: string
  notes?: string
  lines: CreateTransferLineInput[]
}

export interface CreateTransferLineInput {
  item_id: UUID
  quantity: number
  unit_id: UUID
  notes?: string
}