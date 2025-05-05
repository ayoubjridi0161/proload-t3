"use client"

import type React from "react"

import { DashboardHeader } from "~/components/ui/admin/admin-header"
import { DashboardSidebar } from "~/components/ui/admin/admin-sidebar"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
