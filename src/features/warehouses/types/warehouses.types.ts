import type { UUID } from "../../../shared/types/common.types"

export interface Warehouse {
  id: UUID
  code: string
  name: string
  location?: string
  manager?: string
  is_active: boolean
  deleted_at?: string
  created_at: string
  created_by: UUID
}

export interface CreateWarehouseInput {
  code: string
  name: string
  location?: string
  manager?: string
}

export interface UpdateWarehouseInput extends Partial<CreateWarehouseInput> {
  is_active?: boolean
}