import type { UUID, MovementType } from "../../../shared/types/common.types"

export interface StockMovement {
  id: UUID
  movement_number: string
  movement_type: MovementType
  warehouse_id: UUID
  item_id: UUID
  quantity: number
  unit_id: UUID
  movement_date: string
  reference_type?: string
  reference_id?: UUID
  original_movement_id?: UUID
  notes?: string
  created_at: string
  created_by: UUID
}

export interface CurrentStock {
  item_id: UUID
  warehouse_id: UUID
  quantity: number
}

export interface StockCard {
  date: string
  movement_number: string
  movement_type: MovementType
  reference_type?: string
  reference_id?: UUID
  in_qty?: number
  out_qty?: number
  balance: number
  notes?: string
  created_by: UUID
}

export interface StockCardFilter {
  item_id: UUID
  warehouse_id?: UUID
  date_from?: string
  date_to?: string
}