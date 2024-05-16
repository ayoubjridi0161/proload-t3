import Sidenav from "~/components/ui/workouts/Sidenav";
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="h-screen">
        <Sidenav />
        {children}
      </div>
    );
  }
  