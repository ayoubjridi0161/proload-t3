import { auth } from "auth";
import Advertising from "~/components/component/Advertising";
import { roboto } from "~/components/ui/font";
import Header from "~/components/ui/neopost/header";
import SideBar from "~/components/ui/neopost/sideBar";

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
      
    <div className={`${roboto.className} overflow-hidden h-screen`}>
        <Header name={userName ||""} image={image ||""} UUID={UUID}/>
        <main className="">{children}</main>
    </div>);
  }
  