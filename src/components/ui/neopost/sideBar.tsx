"use client"
import type * as React from "react"
import {Medal , Users, HomeIcon, Bell,LifeBuoy, Send,CircleGauge, Settings2,Dumbbell ,BookOpen , CircleUserRound } from "lucide-react"
import { NavSecondary } from "~/components/nav-secondary"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { Collapsible} from "../collapsible"
import { Separator } from "../separator"
import Link from "next/link"
export const WeightLifterIcon = ()=>{
 return (
  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
	<path fill="currentColor" d="M12 5c-1.11 0-2 .89-2 2s.89 2 2 2s2-.89 2-2s-.89-2-2-2m10-4v5h-2V4H4v2H2V1h2v2h16V1zm-7 10.26V23h-2v-5h-2v5H9V11.26C6.93 10.17 5.5 8 5.5 5.5V5h2v.5C7.5 8 9.5 10 12 10s4.5-2 4.5-4.5V5h2v.5c0 2.5-1.43 4.67-3.5 5.76"></path>
</svg>
 )
}
export const TrackIcon = ()=>{
  return(
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path><path fillRule="evenodd" d="M12 3a1 1 0 0 1 1 1v1.07A7 7 0 0 1 18.93 11H20a1 1 0 1 1 0 2h-1.07A7 7 0 0 1 13 18.93V20a1 1 0 1 1-2 0v-1.07A7 7 0 0 1 5.07 13H4a1 1 0 1 1 0-2h1.07A7.005 7.005 0 0 1 11 5.07V4a1 1 0 0 1 1-1m-5 9a5 5 0 1 1 10 0a5 5 0 0 1-10 0" clipRule="evenodd"></path></g></svg>
  )
}
const RecommendationsIcon = ()=>{
  return(<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
    <g fill="none">
      <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
      <path fill="currentColor" d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"></path>
    </g>
  </svg>)
}
const data = {
  user: {
    name: "ayoub",
    email: "jridiayoub700@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
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
      title: "Exercise Library",
      url: "/exercices",
      icon: WeightLifterIcon,
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
      title: "My workouts",
      url: "/dashboard/library",
      icon: Dumbbell,
      items: [],
    },
    {
      title: "notifications",
      url: "/profile/notifications",
      icon: Bell,
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
      title: "Track Workout",
      url: "/dashboard/track",
      icon: TrackIcon,
      items: [],
    },
    {
      title: "Progress",
      url: "/dashboard/progress",
      icon: CircleGauge,
      items: [],
    },
    {title: "Personal Records",
      url: "/dashboard/personalRecords",
      icon: Medal,
      items: [],
    },{
      title: "Recommendations",
      url: "/dashboard/recommendations",
      icon: RecommendationsIcon,
      items: [],
    },{
      title:"logs",
      url:"/dashboard/logs",
      icon: BookOpen,
      items: []
    }
    

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
    <Sidebar  className="dark:border-xtraDarkAccent top-[--header-height] !h-[calc(100svh-var(--header-height))]" {...props}>
      <SidebarContent className=" ">
        {/*first group*/}
      <SidebarGroup>
        {/* <SidebarGroupLabel>Workout</SidebarGroupLabel> */}
        <SidebarMenu>
          {data.navMain.slice(0,3).map((item) => (
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
        <SidebarGroupLabel>Profile</SidebarGroupLabel>
        <SidebarMenu>
          {data.navMain.slice(3,7).map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <Separator className="w-2/3"/>
      {/*third group*/}

      <SidebarGroup>
        <SidebarGroupLabel>Analytics</SidebarGroupLabel>
        <SidebarMenu>
          {data.navMain.slice(7).map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>


      {/*third group*/}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {/* <SidebarFooter className="">
        <NavUser user={{avatar:user.image ?? "",email:user.email ?? "",name:user.name}} />
      </SidebarFooter> */}
    </Sidebar>
  )
}

