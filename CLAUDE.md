# CLAUDE.md — تعليمات للـ AI

> هذا الملف يُقرأ تلقائياً في كل شات جديد.
> يحتوي على كل ما يحتاجه Claude لمتابعة المشروع من حيث توقف.

---

## المشروع

**نظام إدارة المخازن (WMS)**
مبني بـ React + TypeScript + Vite + Supabase

**GitHub:** https://github.com/inventorysaudia-stack/inventorysaudi

---

## القاعدة الذهبية — لا تُكسر أبداً

```
Page → Hook → Service → Repository → Supabase
```

راجع ARCHITECTURE.md للتفاصيل الكاملة.

---

## الـ Phase الحالية

> ⚠️ حدّث هذا السطر بعد كل Phase

**مكتمل:**
- [x] Phase 0: Architecture + Auth + Database Foundation

**الحالي:**
- [ ] Phase 1: Items Management  

**القادم:**
- [ ] Phase 2: Warehouses
- [ ] Phase 3: Stock Movement Engine
- [ ] Phase 4: Receipts
- [ ] Phase 5: Issues
- [ ] Phase 6: Current Stock + Stock Card
- [ ] Phase 7: Transfers
- [ ] Phase 8: Inventory Count
- [ ] Phase 9: Reports
- [ ] Phase 10: Dashboard
- [ ] Phase 11: Permissions + Audit
- [ ] Phase 12: Production

---

## بنية المشروع الحالية

```
src/
├── lib/
│   ├── supabase.ts          ✅ مكتوب
│   └── query-client.ts      ✅ مكتوب
├── features/
│   ├── auth/
│   │   ├── repositories/    ✅ auth.repository.ts
│   │   ├── services/        ✅ auth.service.ts
│   │   ├── hooks/           ✅ useAuth.ts
│   │   ├── pages/           ✅ LoginPage.tsx
│   │   └── components/      ✅ ProtectedRoute.tsx
│   └── dashboard/
│       └── pages/           ✅ DashboardPage.tsx (placeholder)
├── main.tsx                 ✅ مكتوب
└── router.tsx               ✅ مكتوب
```

---

## قواعد الكود

### لا تكتب كوداً يخالف:
1. Page لا تستدعي Supabase أبداً
2. Hook لا يستدعي Repository مباشرة
3. Service لا تستدعي Supabase مباشرة
4. Business Logic فقط في Service
5. SQL فقط في Repository

### صيغة الملفات:
```
[feature].repository.ts   ← Supabase فقط
[feature].service.ts      ← Business Rules فقط
use[Feature].ts           ← React Query + State
[Feature]Page.tsx         ← عرض فقط
```

---

## قواعد المخزون — لا تُنسى

- Stock Movements هي Source of Truth الوحيدة
- الرصيد لا يُعدَّل يدوياً أبداً
- كل تغيير = Stock Movement موثقة
- Negative Stock ممنوع افتراضياً
- Posted Documents لا تُحذف — تُعكس بـ Reversal
- العمليات متعددة الجداول Atomic دائماً

---

## Supabase

- Project موجود ومتصل
- الـ Tables تُنشأ عبر SQL Editor في Supabase Dashboard
- راجع docs/phase-0-guide.md للـ SQL الكامل

---

## GitHub Token

- لرفع الملفات عبر API، اطلب من المستخدم token جديد
- Token السابق يجب أن يكون محذوفاً
- الـ repo: inventorysaudia-stack/inventorysaudi

---

## في كل شات جديد — ابدأ بـ:

1. اقرأ هذا الملف (CLAUDE.md)
2. اقرأ ARCHITECTURE.md
3. اسأل: "نكمل Phase 1 — الأصناف؟"
4. لا تكتب كوداً يخالف القاعدة الذهبية

