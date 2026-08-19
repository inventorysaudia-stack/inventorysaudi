# قواعد المعمارية — نظام إدارة المخازن
# Architecture Rules — WMS

> هذا الملف هو المرجع الإلزامي لكل مطور في المشروع.
> أي كود لا يتبع هذه القواعد يُرفض في Code Review.

---

## القاعدة الذهبية — THE GOLDEN RULE

```
Page → Hook → Service → Repository → Supabase
```

هذا هو المسار الوحيد المسموح به لأي بيانات أو عملية في النظام.
**لا استثناءات. لا اختصارات.**

---

## مسؤولية كل Layer

### 1. Page
```
src/features/[feature]/pages/[Name]Page.tsx
```
**المسموح:**
- عرض Components وتجميعها
- استدعاء Hooks فقط
- تمرير Props للـ Components

**الممنوع:**
- أي استدعاء لـ Supabase
- أي Business Logic
- أي حسابات للمخزون
- أي SQL أو queries

---

### 2. Hook
```
src/features/[feature]/hooks/use[Name].ts
```
**المسموح:**
- useQuery / useMutation من TanStack Query
- UI State (useState, useReducer)
- Cache invalidation
- استدعاء Service فقط

**الممنوع:**
- استدعاء Supabase مباشرة
- Business Logic أو Validation
- استدعاء Repository مباشرة

---

### 3. Service
```
src/features/[feature]/services/[name].service.ts
```
**المسموح:**
- Business Rules
- Validation
- Workflow decisions
- استدعاء Repository فقط

**الممنوع:**
- استدعاء Supabase مباشرة
- أي كود يخص React أو UI
- استدعاء Hook آخر

**أمثلة على Business Rules في Service:**
```typescript
// ✅ صح — Business Rule في Service
if (availableQty < requestedQty) {
  throw new Error('الكمية المطلوبة أكبر من الرصيد المتاح')
}

// ❌ غلط — Business Rule في Page أو Hook
```

---

### 4. Repository
```
src/features/[feature]/repositories/[name].repository.ts
```
**المسموح:**
- التواصل مع Supabase فقط
- SQL queries
- RPC calls
- إرجاع البيانات خام أو مُحوَّلة

**الممنوع:**
- أي Business Logic
- أي UI State
- استدعاء Service آخر

---

### 5. Supabase
**المسموح:**
- Tables & Schema
- RLS Policies
- Database Functions / RPC
- Constraints & Indexes
- Transactions

**القاعدة:** قاعدة البيانات تحمي البيانات حتى لو في الكود bug.

---

## الممنوع نهائياً — HARD RULES

```
❌ Page   → Supabase
❌ Page   → Repository
❌ Hook   → Supabase
❌ Hook   → Repository
❌ Service → Supabase مباشرة
❌ Component → Database
❌ SQL داخل UI
❌ Business Logic داخل Component
❌ حسابات المخزون داخل Page
```

---

## بنية المجلدات — Feature Structure

كل Feature يجب أن يحتوي على هذه المجلدات:

```
src/features/[feature-name]/
├── pages/
│   └── [Name]Page.tsx        ← Layer 1: عرض فقط
├── hooks/
│   └── use[Name].ts          ← Layer 2: React Query + State
├── services/
│   └── [name].service.ts     ← Layer 3: Business Rules
├── repositories/
│   └── [name].repository.ts  ← Layer 4: Supabase فقط
├── components/
│   └── [Name].tsx            ← UI Components خاصة بالـ Feature
└── types/
    └── [name].types.ts       ← Types خاصة بالـ Feature
```

---

## الـ Features المخططة

```
src/features/
├── auth/               ✅ Phase 0
├── dashboard/          🔲 Phase 10
├── items/              🔲 Phase 1
├── warehouses/         🔲 Phase 2
├── stock-movements/    🔲 Phase 3
├── receipts/           🔲 Phase 4
├── issues/             🔲 Phase 5
├── transfers/          🔲 Phase 7
├── inventory-count/    🔲 Phase 8
├── reports/            🔲 Phase 9
└── users/              🔲 Phase 11
```

---

## Shared Layer

المنطق المشترك بين أكثر من Feature يذهب هنا:

```
src/shared/
├── components/
│   ├── ui/             ← Button, Input, Table, Modal, Badge
│   └── layout/         ← Sidebar, Header, AppLayout
├── hooks/
│   └── useToast.ts
├── types/
│   └── common.types.ts
└── utils/
    ├── format.ts       ← تنسيق الأرقام والتواريخ
    └── errors.ts       ← معالجة الأخطاء
```

**قاعدة:** ممنوع Cross-Feature coupling عشوائي.
لو Feature A يحتاج منطق Feature B → يُنقل للـ Shared.

---

## Source of Truth — أهم قاعدة

```
STOCK MOVEMENTS هي Source of Truth الوحيدة
```

- الرصيد لا يُعدَّل يدوياً أبداً
- كل زيادة أو نقص = Stock Movement موثقة
- الرصيد = Opening + IN - OUT +/- Adjustments

```
❌ ممنوع: تعديل رصيد مباشرة
✅ صح:    إنشاء Stock Movement → الرصيد يُحسب منها
```

---

## سياسة الحذف — Delete Policy

| نوع البيانات | السياسة |
|---|---|
| Master Data بدون تاريخ | Hard Delete مسموح |
| Master Data له تاريخ حركات | Soft Delete فقط |
| Posted Transactions | ممنوع الحذف نهائياً |
| تصحيح خطأ في Posted | Reversal فقط |

---

## Document Status

```
DRAFT   → يمكن تعديله
POSTED  → لا يُعدَّل — يُعكس بـ Reversal
REVERSED → تم إنشاء عملية عكس موثقة
```

---

## قواعد قاعدة البيانات

```sql
-- كل جدول يجب أن يحتوي على:
id          UUID PRIMARY KEY DEFAULT uuid_generate_v4()
created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
created_by  UUID REFERENCES auth.users(id)

-- قواعد المنطق في DB:
CHECK (quantity > 0)
CHECK (source_warehouse_id != destination_warehouse_id)
UNIQUE (document_number)
```

---

## Git Workflow

```
main (محمي — ممنوع Push مباشر)
  ↑
feature/[name]
  ↑
يبدأ من: git checkout -b feature/items main
ينتهي بـ: Pull Request → CI أخضر → Merge
```

### صيغة Commit Messages
```
feat:     feature جديد
fix:      تصحيح bug
refactor: تحسين كود
docs:     توثيق
test:     إضافة tests
db:       تغييرات Database
chore:    إعدادات وصيانة
```

---

## Definition of Done

Feature لا تُعتبر مكتملة إلا عندما:

- [ ] Architecture صحيحة (Page→Hook→Service→Repository→Supabase)
- [ ] Business Rules مكتملة في Service
- [ ] Database Constraints موجودة
- [ ] Error Handling للمستخدم (رسائل مفهومة)
- [ ] No Dead Code
- [ ] No Duplicate Logic
- [ ] CI أخضر

---

## أمثلة عملية

### ✅ صح — إضافة صنف جديد

```typescript
// 1. Page — عرض فقط
function ItemsPage() {
  const { createItem, isCreating } = useItems()
  return <ItemForm onSubmit={createItem} loading={isCreating} />
}

// 2. Hook — React Query
function useItems() {
  const mutation = useMutation({
    mutationFn: (data) => itemsService.createItem(data),
    onSuccess: () => queryClient.invalidateQueries(['items'])
  })
  return { createItem: mutation.mutate, isCreating: mutation.isPending }
}

// 3. Service — Business Rules
const itemsService = {
  async createItem(data) {
    if (!data.sku) throw new Error('كود الصنف مطلوب')
    if (!data.name_ar) throw new Error('اسم الصنف بالعربي مطلوب')
    return itemsRepository.create(data)
  }
}

// 4. Repository — Supabase فقط
const itemsRepository = {
  async create(data) {
    const { data: item, error } = await supabase
      .from('items')
      .insert(data)
      .select()
      .single()
    if (error) throw error
    return item
  }
}
```

### ❌ غلط — مثال على المخالفة
```typescript
// ❌ Page تتكلم مع Supabase مباشرة
function ItemsPage() {
  const handleCreate = async (data) => {
    const { error } = await supabase.from('items').insert(data) // ❌ ممنوع!
  }
}

// ❌ Hook يتخطى Service
function useItems() {
  return useMutation({
    mutationFn: (data) => itemsRepository.create(data) // ❌ Hook → Repository مباشرة
  })
}
```

---

*هذا الملف جزء من Project Constitution — يُراجع قبل كتابة أي سطر كود.*
