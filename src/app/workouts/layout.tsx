import { auth } from "auth";
import Sidenav from "~/components/ui/workouts/Sidenav";
import { Suspense } from "react";
import Loader1 from "~/components/ui/loadingScreen/loader1";
export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const session = await auth();
    
    const user  = session?.user;
    return (
      <Suspense fallback={<Loader1/>}>
      <div className="border-collapse h-screen grid grid-cols-8 grid-row-6 place-content-stretch">
        <div className="border-x-4 p-5 row-span-1 col-span-6 col-start-2">
          <Sidenav username={user?.name}/>
        </div>
        <div className="row-span-5 row-start-2 col-start-1 col-span-1 border-y-4"></div>
        <div className="border-4  row-span-5 p-5 col-start-2 col-span-6">
        {children}
        </div>
        <div className="row-span-5 row-start-2 col-start-8 col-span-1 border-y-4"></div>

        <div className="border-x-4  row-span-1 p-5 col-start-2 col-span-6">
        <Sidenav username={user?.name} />
        </div>

      </div>
      </Suspense>  );
  }
  