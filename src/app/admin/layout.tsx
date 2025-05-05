import type React from "react"
import { DashboardLayout } from "~/components/ui/admin/admin-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
