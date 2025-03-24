"use client"

import { useState } from "react"
import { AccountSettings } from "~/components/ui/settings/account-settings"
import { GeneralSettings } from "~/components/ui/settings/general-settings"
import { PrivacySettings } from "~/components/ui/settings/privacy-settings"
import Sidebar from "~/components/ui/settings/sidebar"
import { SidebarProvider, SidebarInset } from "~/components/ui/sidebar"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("general")

  return (
    <Sidebar/>
  )
}
