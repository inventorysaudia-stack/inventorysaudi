import type { UUID, DocumentStatus } from "../../../shared/types/common.types"

export interface Issue {
  id: UUID
  issue_number: string
  warehouse_id: UUID
  issue_date: string
  reference?: string
  notes?: string
  status: DocumentStatus
  created_at: string
  created_by: UUID
  posted_at?: string
  posted_by?: UUID
}

export interface IssueLine {
  id: UUID
  issue_id: UUID
  item_id: UUID
  quantity: number
  unit_id: UUID
  notes?: string
}

export interface CreateIssueInput {
  warehouse_id: UUID
  issue_date: string
  reference?: string
  notes?: string
  lines: CreateIssueLineInput[]
}

export interface CreateIssueLineInput {
  item_id: UUID
  quantity: number
  unit_id: UUID
  notes?: string
}