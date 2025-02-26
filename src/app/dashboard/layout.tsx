import { inter } from "~/components/ui/font";
import Header from "~/components/ui/neopost/header";
import SideBar from "~/components/ui/neopost/sideBar";
import Aside from "~/components/ui/userDashboard/Aside";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth()
  //       const userName= session?.user?.name
  //       const image = session?.user?.image
  //       const UUID = session?.user?.id
  return (
    <div className={`${inter.className} bg-[#fef2f2] my-0 grid grid-cols-4 w-full`}>
      <Aside />
      <main className="p-0 col-span-3 h-screen overflow-scroll">{children}</main>
    </div>
  );
}

