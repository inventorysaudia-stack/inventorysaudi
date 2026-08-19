import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { itemsService } from "../services/items.service"
import { useAuth } from "../../auth/hooks/useAuth"
import { parseError } from "../../../shared/utils/errors"
import type { CreateItemInput, UpdateItemInput, ItemFilter } from "../types/items.types"
import type { PaginationParams } from "../../../shared/types/common.types"

// Hook: React Query + UI State فقط — لا business logic هنا
export const ITEMS_KEYS = {
  all: ["items"] as const,
  list: (filter?: ItemFilter) => ["items", "list", filter] as const,
  detail: (id: string) => ["items", "detail", id] as const,
}

export function useItems(filter: ItemFilter = {}, pagination?: PaginationParams) {
  return useQuery({
    queryKey: ITEMS_KEYS.list(filter),
    queryFn: () => itemsService.getItems(filter, pagination),
  })
}

export function useItem(id: string) {
  return useQuery({
    queryKey: ITEMS_KEYS.detail(id),
    queryFn: () => itemsService.getItemById(id),
    enabled: !!id,
  })
}

export function useCreateItem() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (input: CreateItemInput) =>
      itemsService.createItem(input, user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_KEYS.all })
    },
    onError: (error) => {
      console.error("Create item failed:", parseError(error))
    },
  })
}

export function useUpdateItem() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateItemInput }) =>
      itemsService.updateItem(id, input, user!.id),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ITEMS_KEYS.all })
      queryClient.invalidateQueries({ queryKey: ITEMS_KEYS.detail(id) })
    },
  })
}

export function useArchiveItem() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (id: string) => itemsService.archiveItem(id, user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_KEYS.all })
    },
  })
}