import { auth } from "auth";
import Sidenav from "~/components/ui/workouts/Sidenav";
import { Suspense } from "react";
import Loader1 from "~/components/ui/loadingScreen/loader1";
import RetroGrid from "~/components/magicui/retro-grid";
import HeaderNav from "~/components/ui/homePage/HeaderNav";
export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const session = await auth();
    
    const user  = session?.user;
    return (
      
      <div className="h-screen  space-y-7">
        <div className=" bg-primary-foreground  p-5 ">
          <HeaderNav />
        </div>
        <div className="w-9/12 mx-auto">
        {children}
        </div>

       

      </div>);
  }
  