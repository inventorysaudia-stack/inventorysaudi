import type { UUID } from "../../../shared/types/common.types"

export interface Item {
  id: UUID
  sku: string
  barcode?: string
  name_ar: string
  name_en?: string
  category_id?: UUID
  base_unit_id: UUID
  minimum_stock: number
  notes?: string
  is_active: boolean
  deleted_at?: string
  created_at: string
  created_by: UUID
  updated_at: string
}

export interface ItemWithStock extends Item {
  current_stock: number
  unit_name: string
  category_name?: string
}

export interface CreateItemInput {
  sku: string
  barcode?: string
  name_ar: string
  name_en?: string
  category_id?: UUID
  base_unit_id: UUID
  minimum_stock?: number
  notes?: string
}

export interface UpdateItemInput extends Partial<CreateItemInput> {
  is_active?: boolean
}

export interface ItemFilter {
  search?: string
  category_id?: UUID
  is_active?: boolean
  low_stock?: boolean
}