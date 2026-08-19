# نظام إدارة المخازن (WMS)

نظام إدارة مخازن احترافي مبني بـ React + TypeScript + Supabase

## التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| React 18 + TypeScript | واجهة المستخدم |
| Vite | Build Tool |
| Supabase (PostgreSQL) | قاعدة البيانات |
| TanStack Query | Data Fetching |
| React Router DOM | التوجيه |

## القاعدة الذهبية

```
Page → Hook → Service → Repository → Supabase
```

## بنية المشروع

```
src/
├── features/
│   ├── auth/
│   ├── items/
│   ├── warehouses/
│   ├── stock-movements/
│   ├── receipts/
│   ├── issues/
│   ├── transfers/
│   ├── inventory-count/
│   ├── reports/
│   └── dashboard/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── types/
│   └── utils/
└── lib/
    ├── supabase.ts
    └── query-client.ts
```

## المبدأ الأساسي

**Stock Movements هي Source of Truth** — الرصيد لا يُعدَّل يدوياً أبداً.
كل زيادة أو نقص يجب أن يكون له حركة موثقة.

## البدء

```bash
npm install
cp .env.example .env.local
# أضف بيانات Supabase في .env.local
npm run dev
```

## Phases

- [x] Phase 0: Architecture + Auth + Database Foundation
- [ ] Phase 1: Items Management
- [ ] Phase 2: Warehouses
- [ ] Phase 3: Stock Movement Engine
- [ ] Phase 4: Goods Receipt (إذن إضافة)
- [ ] Phase 5: Goods Issue (إذن صرف)
- [ ] Phase 6: Current Stock + Stock Card
- [ ] Phase 7: Transfers (تحويل بين المخازن)
- [ ] Phase 8: Inventory Count & Adjustments
- [ ] Phase 9: Reports
- [ ] Phase 10: Dashboard
- [ ] Phase 11: Permissions + Audit Trail
- [ ] Phase 12: Production Readiness