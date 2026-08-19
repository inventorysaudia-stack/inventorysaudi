import { itemsRepository } from "../repositories/items.repository"
import { ValidationError } from "../../../shared/utils/errors"
import type { CreateItemInput, UpdateItemInput, ItemFilter } from "../types/items.types"
import type { UUID, PaginationParams } from "../../../shared/types/common.types"

// Service: Business Rules والتحقق فقط — لا Supabase هنا
export const itemsService = {

  async getItems(filter: ItemFilter = {}, pagination?: PaginationParams) {
    return itemsRepository.findAll(filter, pagination)
  },

  async getItemById(id: UUID) {
    const item = await itemsRepository.findById(id)
    if (!item) throw new ValidationError("الصنف غير موجود")
    return item
  },

  async createItem(input: CreateItemInput, userId: UUID) {
    // Business Rule: SKU مطلوب وغير مكرر
    if (!input.sku || input.sku.trim() === "") {
      throw new ValidationError("كود الصنف (SKU) مطلوب")
    }
    if (!input.name_ar || input.name_ar.trim() === "") {
      throw new ValidationError("اسم الصنف بالعربي مطلوب")
    }
    if (!input.base_unit_id) {
      throw new ValidationError("وحدة القياس مطلوبة")
    }

    const skuExists = await itemsRepository.checkSkuExists(input.sku)
    if (skuExists) {
      throw new ValidationError(`كود الصنف "${input.sku}" مستخدم مسبقاً`)
    }

    return itemsRepository.create(input, userId)
  },

  async updateItem(id: UUID, input: UpdateItemInput, userId: UUID) {
    await itemsService.getItemById(id) // تحقق من وجوده

    if (input.sku) {
      const skuExists = await itemsRepository.checkSkuExists(input.sku, id)
      if (skuExists) throw new ValidationError(`كود الصنف "${input.sku}" مستخدم مسبقاً`)
    }

    return itemsRepository.update(id, input, userId)
  },

  async archiveItem(id: UUID, userId: UUID) {
    await itemsService.getItemById(id)
    // Business Rule: نستخدم Soft Delete فقط — لا Hard Delete
    return itemsRepository.softDelete(id, userId)
  },

  async restoreItem(id: UUID, userId: UUID) {
    return itemsRepository.restore(id, userId)
  },
}