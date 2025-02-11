import { auth } from "auth";
import { Bell, MessageCircle, MessagesSquare, Search } from "lucide-react";
import { Avatar } from "~/components/ui/avatar";
import DropDown from "~/components/ui/DropDown";
import { Input } from "~/components/ui/input";
import HeaderUI from "~/components/ui/uizard/header";


export default async function RootLayout({
    children,
  }: {
    children:React.ReactNode;
  }) {
    const layoutData = "layourDtata"
    const session = await auth();
    const user = session?.user;
    if(!user ) throw new Error("no user")
    const {image,name:userName,id:UUID} = user
    return (
    <div className=" ">
        <HeaderUI image = {image} userName = {userName} UUID = {UUID} />
        <main >
          {children}
          </main>
        
      </div>
    )
  }
  