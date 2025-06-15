import { Separator } from "@radix-ui/react-separator";
import { auth } from "auth";
import { AppSidebar } from "~/components/ui/neopost/sideBar";
import SideConnets from "~/components/ui/neopost/sideConnets";
import { Sidebar, SidebarContent } from "~/components/ui/sidebar";
import WorkoutCalendar from "~/components/ui/userDashboard/workoutCalendar";
import { fetchWorkoutDates } from "~/lib/actions/userLogsActions";
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
      {UUID && <AppSidebar className=" pt-5" user={{name:userName ?? "",email:email,image:image,id:UUID ?? ""}} />}
        {children} 
    </main>
  );
}

