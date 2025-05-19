import PersonalRecords from "~/components/ui/userDashboard/PR"
import { AppSidebar } from "../../../../components/app-sidebar"
import { SiteHeader } from "../../../../components/site-header"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth()
  //       const userName= session?.user?.name
  //       const image = session?.user?.image
  //       const UUID = session?.user?.id
  return (
    // <div className={`${inter.className} bg-[#fef2f2] my-0 grid grid-cols-5 w-full`}>
    //   {/* <Aside />
    //   <main className="p-0 col-span-4 h-screen overflow-scroll">{children}</main> */}

    // </div>
    <div className="[--header-height:calc(theme(spacing.14))] ">
    <SidebarProvider className="flex flex-col ">
      <SiteHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          {/* */}
          {children}
          {/* <PersonalRecords /> */}
        </SidebarInset>
      </div>
    </SidebarProvider>
  </div>
  );
}

