import { auth } from "auth";
import Header from "~/components/ui/neopost/header";
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
        const email = session?.user?.email
  return (
    <div className="[--header-height:calc(theme(spacing.14))] ">
    <SidebarProvider className="flex flex-col ">
    <Header name={userName  ?? ""} image={image ?? ""} UUID={UUID}/>
      <div className="flex flex-1">
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  </div>
  );
}

