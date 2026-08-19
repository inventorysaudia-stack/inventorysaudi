import { supabase } from "../../../lib/supabase"
import type { Item, CreateItemInput, UpdateItemInput, ItemFilter } from "../types/items.types"
import type { UUID, PaginatedResult, PaginationParams } from "../../../shared/types/common.types"

// Repository: يتكلم مع Supabase فقط — لا business logic هنا
export const itemsRepository = {

  async findAll(
    filter: ItemFilter = {},
    pagination: PaginationParams = { page: 1, pageSize: 20 }
  ): Promise<PaginatedResult<Item>> {
    let query = supabase
      .from("items")
      .select("*, units(name_ar), categories(name_ar)", { count: "exact" })
      .is("deleted_at", null)

    if (filter.search) {
      query = query.or(`name_ar.ilike.%${filter.search}%,sku.ilike.%${filter.search}%`)
    }
    if (filter.category_id) query = query.eq("category_id", filter.category_id)
    if (filter.is_active !== undefined) query = query.eq("is_active", filter.is_active)

    const from = (pagination.page - 1) * pagination.pageSize
    query = query.range(from, from + pagination.pageSize - 1).order("created_at", { ascending: false })

    const { data, error, count } = await query
    if (error) throw error

    return {
      data: data as Item[],
      total: count ?? 0,
      page: pagination.page,
      pageSize: pagination.pageSize,
    }
  },

  async findById(id: UUID): Promise<Item | null> {
    const { data, error } = await supabase
      .from("items")
      .select("*, units(name_ar), categories(name_ar)")
      .eq("id", id)
      .is("deleted_at", null)
      .single()

    if (error) throw error
    return data as Item
  },

  async create(input: CreateItemInput, userId: UUID): Promise<Item> {
    const { data, error } = await supabase
      .from("items")
      .insert({ ...input, created_by: userId })
      .select()
      .single()

    if (error) throw error
    return data as Item
  },

  async update(id: UUID, input: UpdateItemInput, userId: UUID): Promise<Item> {
    const { data, error } = await supabase
      .from("items")
      .update({ ...input, updated_by: userId, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data as Item
  },

  async softDelete(id: UUID, userId: UUID): Promise<void> {
    const { error } = await supabase
      .from("items")
      .update({ deleted_at: new Date().toISOString(), updated_by: userId })
      .eq("id", id)

    if (error) throw error
  },

  async restore(id: UUID, userId: UUID): Promise<void> {
    const { error } = await supabase
      .from("items")
      .update({ deleted_at: null, updated_by: userId })
      .eq("id", id)

    if (error) throw error
  },

  async checkSkuExists(sku: string, excludeId?: UUID): Promise<boolean> {
    let query = supabase.from("items").select("id").eq("sku", sku).is("deleted_at", null)
    if (excludeId) query = query.neq("id", excludeId)
    const { data } = await query
    return (data?.length ?? 0) > 0
  },
}