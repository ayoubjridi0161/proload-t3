import Sidenav from "~/components/ui/workouts/Sidenav";
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="border-collapse h-screen grid grid-cols-8 grid-row-6 place-content-stretch">
        <div className="border-x-4 border-gray-800 self-stretch p-5 row-span-1  col-span-6 col-start-2">
        <Sidenav />
        </div>
        <div className="row-span-5 border-gray-800 row-start-2 col-start-1 col-span-1 border-y-4"></div>
        <div className="border-4  border-gray-800 row-span-5 p-5 col-start-2 col-span-6">
        {children}
        </div>
        <div className="row-span-5 border-gray-800 row-start-2 col-start-8 col-span-1 border-y-4"></div>

        <div className="border-x-4 border-gray-800 row-span-1 p-5 col-start-2 col-span-6">
        <Sidenav />
        </div>

      </div>
    );
  }
  