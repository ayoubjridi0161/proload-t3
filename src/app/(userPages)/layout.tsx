import { auth } from "auth";
import Advertising from "~/components/component/Advertising";
import { roboto } from "~/components/ui/font";
import Header from "~/components/ui/neopost/header";
import SideBar from "~/components/ui/neopost/sideBar";

// export default async function RootLayout({
//     children,
//   }: {
//     children: React.ReactNode;
//   }) {
//     const session = await auth()
//           const userName= session?.user?.name
//           const image = session?.user?.image
//           const UUID = session?.user?.id
//     return (
      
//     <div className={`${roboto.className} overflow-hidden h-screen`}>
//         <Header name={userName  ?? ""} image={image ?? ""} UUID={UUID}/>
//         <main>{children}</main>
//     </div>);
//   }
  import PersonalRecords from "~/components/ui/userDashboard/PR"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
      const session = await auth()
          const userName= session?.user?.name
          const image = session?.user?.image
          const UUID = session?.user?.id
  return (
    <div className="[--header-height:calc(theme(spacing.14))]   bg-[#f2fcf5] ">
    <SidebarProvider className="flex flex-col ">
    <Header name={userName  ?? ""} image={image ?? ""} UUID={UUID}/>
      <div className="flex flex-1 xl:w-2/3 mx-auto max-w-[calc(100vw-2*theme(spacing.8))]">
        <SidebarInset className="bg-[#f2fcf5] ">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  </div>
  );
}