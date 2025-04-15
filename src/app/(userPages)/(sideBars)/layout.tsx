import { auth } from "auth";
import { AppSidebar } from "~/components/ui/neopost/sideBar";
import SideConnets from "~/components/ui/neopost/sideConnets";
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
    <main className='flex justify-between '>
      <AppSidebar className=" pt-5" user={{name:userName ?? "",email:email,image:image,id:UUID ?? ""}} />
        {children} 
      {/* <SideConnets className="" /> */}
    </main>
  );
}

