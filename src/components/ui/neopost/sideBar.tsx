"use client"
import type * as React from "react"
import {Users, HomeIcon, LifeBuoy, MessageCircle, Send,CircleGauge, Settings2,Dumbbell , CircleUserRound } from "lucide-react"

import { NavMain } from "~/components/nav-main"
import { NavProjects } from "~/components/nav-projects"
import { NavSecondary } from "~/components/nav-secondary"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible"
import { Separator } from "../separator"

const data = {
  user: {
    name: "ayoub",
    email: "jridiayoub700@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/neopost",
      icon: HomeIcon,
      isActive: true,
      items: [],
    },
    {
      title: "Workouts",
      url: "/workouts",
      icon: Dumbbell,
      isActive: true,
      items: [],
    },
    {
      title: "My profile",
      url: "/profile",
      icon: CircleUserRound,
      items: [],
    },
    {
      title: "Messages",
      url: "/Messages",
      icon: MessageCircle,
      items: [],
    },
    {
      title: "Friends",
      url: "/profile/friends",
      icon: Users,
      items: [],
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Settings2,
      items: [],
    },
    {
      title: "My workouts",
      url: "/dashboard/library",
      icon: Dumbbell,
      items: [],
    },

  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  
}
interface AppSidebarProps {
  className?: string;
  user: {
    name: string;
    email: string | null | undefined;
    image: string | null | undefined;
    id: string;
  };
}

export function AppSidebar({className, user, ...props}: AppSidebarProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Sidebar className="!sticky !h-[calc(100svh-var(--header-height))] pt-5" {...props}>
      <SidebarContent className="bg-[#f2fcf5] ">
        {/*first group*/}
      <SidebarGroup>
        {/* <SidebarGroupLabel>Workout</SidebarGroupLabel> */}
        <SidebarMenu>
          {data.navMain.slice(0,2).map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <Separator className="w-2/3"/>
      {/*second group*/}
      <SidebarGroup>
        {/* <SidebarGroupLabel>Workout</SidebarGroupLabel> */}
        <SidebarMenu>
          {data.navMain.slice(2,5).map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <Separator className="w-2/3"/>
      {/*third group*/}

      <SidebarGroup>
        {/* <SidebarGroupLabel>Workout</SidebarGroupLabel> */}
        <SidebarMenu>
          {data.navMain.slice(5).map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>


      {/*third group*/}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-[#f2fcf5]">
        <NavUser user={{avatar:user.image ?? "",email:user.email ?? "",name:user.name}} />
      </SidebarFooter>
    </Sidebar>
  )
}

