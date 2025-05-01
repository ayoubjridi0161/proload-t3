"use client"

import { SidebarIcon } from "lucide-react"
import {usePathname} from 'next/navigation'

import { SearchForm } from "./search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { useSidebar } from "~/components/ui/sidebar"

export function SiteHeader() {
  // const { toggleSidebar } = useSidebar()
  // const path = usePathname()?.replace("/dashboard", "") ?? ""
  // if(path == "/track" ){
  //   path = "track workout"
  // }
  // if(path == "/personalRecords"){
  //   path ="personal records"
  // }
  // if(path == "/library"){
  //   path = "workout library"
  // }

  return (
    // <header className="fle sticky top-0 z-50 w-full items-center border-b bg-dashboardBackground">
    //   <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
    //     <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
    //       <SidebarIcon />
    //     </Button>
    //     <Separator orientation="vertical" className="mr-2 h-4" />
    //     <Breadcrumb className="hidden sm:block">
    //       <BreadcrumbList>
    //         <BreadcrumbItem>
    //           <BreadcrumbLink href="/dashboard">dashboard</BreadcrumbLink>
    //         </BreadcrumbItem>
    //         <BreadcrumbSeparator />
    //         <BreadcrumbItem>
    //           <BreadcrumbPage>{path}</BreadcrumbPage>
    //         </BreadcrumbItem>
    //       </BreadcrumbList>
    //     </Breadcrumb>
    //     <SearchForm className="w-full sm:ml-auto sm:w-auto" />
    //   </div>
    // </header>
    <div></div>
  )
}

