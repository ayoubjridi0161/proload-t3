import { Tabs } from "@nextui-org/react"
import { TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"
import {  Dumbbell } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { andika } from "~/components/ui/font"
import { SidebarContent,Sidebar, SidebarHeader } from "~/components/ui/sidebar"
import Container from "~/components/ui/userDashboard/Container"
import PersonalRecords from "~/components/ui/userDashboard/PR"
import RefreshButton from "~/components/ui/userDashboard/RefreshButton"
import { getAchievementsAction } from "~/lib/actions/userActions"
import { fetchPersonalRecords } from "~/lib/actions/userLogsActions"
import { getAchievementNameAndTier } from "~/lib/translateAchievement"

const page = async () => {
    const personalRecords = await fetchPersonalRecords()
    const filteredData = personalRecords?.filter(item => item.exercise !== "totalWeight")
    const achievements = await getAchievementsAction()
    const parsedAchievements = achievements?.map((achievement) => {
        const ach = getAchievementNameAndTier(achievement.achievement, achievement.tier ?? 1)
        return {
            ...ach,
            description: achievement.description,
        }
    })
  return (
    <>
    <section className={`${andika.className} w-full space-y-5 p-5 text-[#707877]`}>
        <div>
            <h1 className="text-lg font-bold">Personal Records</h1>
            <p className="text-sm">Track progress and plan workouts for peak performance</p>
        </div>
        {filteredData && filteredData.length > 0 ?  <PersonalRecords personalRecords = {filteredData} achievements={parsedAchievements}/>
        : <div>
            <p>No records to be found</p>
            <RefreshButton/>
            </div>}

    </section>
    <Sidebar className="border-left-1 px-3 py-3 dark:border-xtraDarkAccent top-[--header-height] !h-[calc(100svh-var(--header-height))]" side="right">
        {/* <SidebarHeader>
            hello
        </SidebarHeader> */}    
        <SidebarContent>
        {personalRecords?.slice(0,3).map((item,index)=>
            <Container key={index} className='border-1 border-slate-200 shadow-sm text-[#707877] space-y-3'>
                <div className="flex gap-5 items-center">
                    <div className='rounded-full w-fit p-2  bg-green-100'><Dumbbell className="text-xtraLight"/></div>
                    <p className='text-lg font-bold'>{item.exercise}</p>
                    </div>
                    <h3 className='text-xs'>Most improved</h3>
                    <p className='text-lg font-bold'>{item.records.length>0 && item.records[item.records.length-1]}kg</p>
                   {/* {item.records && item.records.length > 1 && (
                     <p className='text-sm'>
                       {((item.records[item.records.length - 1]! - item.records[item.records.length - 2]!) / 
                         item.records[item.records.length - 2]! * 100).toFixed(1)}% improvement
                     </p>
                   )} */}
                   <div>
                    <Link href={"/dashboard/progress"} className='bg-[#256200] py-1 px-3 rounded-md text-orange-200 font-bold'>View Progress</Link>
                    </div></Container>
        )       
        }           
        </SidebarContent>
    </Sidebar>
</>
)
}

export default page