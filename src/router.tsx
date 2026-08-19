import { createBrowserRouter } from "react-router-dom"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { AppLayout } from "./shared/components/layout/AppLayout"
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute"
import { DashboardPage } from "./features/dashboard/pages/DashboardPage"
import { ItemsPage } from "./features/items/pages/ItemsPage"
import { WarehousesPage } from "./features/warehouses/pages/WarehousesPage"
import { StockMovementsPage } from "./features/stock-movements/pages/StockMovementsPage"
import { ReceiptsPage } from "./features/receipts/pages/ReceiptsPage"
import { IssuesPage } from "./features/issues/pages/IssuesPage"
import { TransfersPage } from "./features/transfers/pages/TransfersPage"
import { InventoryCountPage } from "./features/inventory-count/pages/InventoryCountPage"
import { ReportsPage } from "./features/reports/pages/ReportsPage"
import { UsersPage } from "./features/users/pages/UsersPage"

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true,                  element: <DashboardPage /> },
      { path: "items",                element: <ItemsPage /> },
      { path: "warehouses",           element: <WarehousesPage /> },
      { path: "movements",            element: <StockMovementsPage /> },
      { path: "receipts",             element: <ReceiptsPage /> },
      { path: "issues",               element: <IssuesPage /> },
      { path: "transfers",            element: <TransfersPage /> },
      { path: "inventory-count",      element: <InventoryCountPage /> },
      { path: "reports",              element: <ReportsPage /> },
      { path: "users",                element: <UsersPage /> },
    ],
  },
])