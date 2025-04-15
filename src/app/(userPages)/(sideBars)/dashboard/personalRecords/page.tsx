import { Tabs } from "@nextui-org/react"
import { TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"
import {  Dumbbell } from "lucide-react"
import { Button } from "~/components/ui/button"
import { andika } from "~/components/ui/font"
import { SidebarContent,Sidebar, SidebarHeader } from "~/components/ui/sidebar"
import Container from "~/components/ui/userDashboard/Container"
import PersonalRecords from "~/components/ui/userDashboard/PR"
import RefreshButton from "~/components/ui/userDashboard/RefreshButton"
import { fetchPersonalRecords } from "~/lib/actions"

const page = async () => {
    const personalRecords = await fetchPersonalRecords()
  return (
    <>
    <section className={`${andika.className} w-full space-y-5 p-5 text-[#707877]`}>
        <div>
            <h1 className="text-lg font-bold">Personal Records</h1>
            <p className="text-sm">Track progress and plan workouts for peak performance</p>
        </div>
        {personalRecords && personalRecords.length > 0 ?  <PersonalRecords personalRecords = {personalRecords}/>
        : <div>
            <p>No records to be found</p>
            <RefreshButton/>
            </div>}

    </section>
    <Sidebar className="border-left-1 px-3 bg-[#f2fcf5] top-[--header-height] !h-[calc(100svh-var(--header-height))]" side="right">
        <SidebarHeader>
            hello
        </SidebarHeader>
        <SidebarContent>
        {personalRecords && 
            /* <Container className='border-1 border-slate-200 text-[#707877] space-y-3'>
                    <div className='rounded-full w-fit p-2 bg-green-100'><Dumbbell /></div>
                    <h3 className='text-xs'>Latest Achievement</h3>
                    {personalRecords
                        .filter(record => record.exercise === 'Deadlift')
                        .map(record => {
                            const latestPR = Math.max(...record.records);
                            const previousPR = record.records[record.records.length - 2] ?? latestPR;
                            const increase = latestPR - previousPR;
                            
                            return (
                                <>
                                    <h1 className='text-lg font-bold'>Deadlift: {latestPR}kg</h1>
                                    <p className='text-sm'>
                                        {increase > 0 
                                            ? `Achieved Today - ${increase}kg increase`
                                            : 'No recent improvement'
                                        }
                                    </p>
                                </>
                            );
                        })}
                    <Button className='bg-[#256200] text-orange-200 font-bold'>Share</Button>
                </Container> */
                <Container className='border-1 border-slate-200 text-[#707877] space-y-3'>
                    <div className='rounded-full w-fit p-2 bg-green-100'><Dumbbell /></div>
                    <h3 className='text-xs'>Most improved</h3>
                    <h1 className='text-lg font-bold'>Bench Press: 120kg</h1>
                    <p className='text-sm'>+25% in last 20 days </p>
                    <Button className='bg-[#256200] text-orange-200 font-bold'>View Progress</Button>
                </Container>
        }           
        </SidebarContent>
    </Sidebar>
</>
)
}

export default page