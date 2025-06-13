import { andika, lalezar } from '../font'
import Container from './Container'
import {Table,TableBody,TableCell,TableHead,TableHeader, TableRow} from '~/components/ui/table'
import RefreshButton from './RefreshButton'
import Image from 'next/image'
import { Card } from '../card'
import { Medal } from 'lucide-react'
type Props = {
    personalRecords : {
        exercise: string;
        records: number[];
    }[]
    achievements: {
        description: string | null;
        name?: string | undefined;
        tier?: number | undefined;
        category?: string | undefined;
    }[] | undefined
}
const tierColors = [
    "#fff",
    "#CD7F32",  // Tier 1 - Cool Gray (Weight Warrior)
    "#4FD1C5",  // Tier 2 - Teal (Iron Challenger)
    "#FFD700",  // Tier 3 - Orange (Steel Dominator)
    "#e5e4e2",  // Tier 4 - Pink (Barbell Conqueror)
    "#2B303E",  // Tier 5 - Purple (Limit Breaker)
    "#F56565"   // Tier 6 - Fiery Red (Mythic Beast)
]
function getCategoryImage(cat: string | undefined): string {
    switch (cat) {
        case "totalWeight":
            return "/total weight.png"
        case "workoutCount":
            return "/total sessions.png"
        case "maxWeight":
            return "/max weight.png"
        default:
            return "/defaultAch.jpg"
    }
}
const PersonalRecords =(props: Props) => {
  return (
    <div className={`w-full ${andika.className} space-y-5 `}>
        <div className='space-y-2 p-4 '>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg '>All Personal Records</h1>
                <RefreshButton/>
            </div>
            <div className="max-h-[400px] overflow-y-auto px-2 bg-[#f2fcf5] dark:bg-xtraDarkAccent">
                <Table className=' '>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Exercise</TableHead>
                            <TableHead>Best Record</TableHead>
                            <TableHead>Improvement</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.personalRecords
                            .sort((a, b) => Math.max(...b.records) - Math.max(...a.records))
                            .slice(0, 8)
                            .map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell>{record.exercise}</TableCell>
                                    <TableCell>{Math.max(...record.records)} kg</TableCell>
                                    <TableCell>
                                        {record.records.length > 1 
                                            ? `+${Math.max(...record.records) - (record.records[record.records.length - 2] ?? 0)} kg`
                                            : '-'
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        {props.personalRecords.length > 8 && 
                            props.personalRecords
                                .sort((a, b) => Math.max(...b.records) - Math.max(...a.records))
                                .slice(8)
                                .map((record, index) => (
                                    <TableRow key={index + 8}>
                                        <TableCell>{record.exercise}</TableCell>
                                        <TableCell>{Math.max(...record.records)} kg</TableCell>
                                        <TableCell>
                                            {record.records.length > 1 
                                                ? `+${Math.max(...record.records) - (record.records[record.records.length - 2] ?? 0)} kg`
                                                : '-'
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </div>
            
        </div>
        <div className='space-y-4 p-4 '>
        <h1 className='text-lg '>Achievements</h1>
        <div className='grid grid-cols-3 gap-4 '>
            {props.achievements?.map((achievement,index)=> (
                <Card
                key={index}
                className="flex items-center gap-4 p-4 w-full border-4 hover:bg-neutral-900/70 transition-all"
                style={{borderColor:tierColors[achievement.tier ?? 1]}}                      
                >
                <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                        src={getCategoryImage(achievement.category)}
                        alt={achievement.name ?? "alt"}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-2">
                        <Medal
                        size={20}
                            className="flex-shrink-0 text-xs"
                            style={{ color: tierColors[achievement.tier ?? 1] }}
                        />
                        <span className="font-semibold text-lg" style={{color: tierColors[achievement.tier ?? 1]}}>{achievement.name}</span>
                    </div>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
            </Card>
            ))}
        </div>
            
        </div>

    </div>
  )
}

const Dumbbell = ()=> {
    return(<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
        <g fill="none" stroke="#00c846" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} color="#00c846">
            <path d="M16 8a2.62 2.62 0 0 1-1.455 1.607q-3.421 1.517-4.937 4.937A2.62 2.62 0 0 1 8 16m-4.8 4.8L2 22M20.8 3.2L22 2m-4.212.42l-1.512 1.454l3.84 3.876l1.478-1.434c.444-.523.58-.916.027-1.641l-1.105-1.163l-1.121-1.106c-.717-.642-1.281-.297-1.607.015"></path>
            <path d="M14.012 3.756c1.11-1.173 1.87-.338 2.261.127l3.808 3.823c.474.38 1.34 1.109.195 2.244c-.185.183-.366.375-.567.54c-.742.61-1.454.105-1.831-.36l-3.876-3.876c-.408-.366-1.113-1.03-.518-1.918c.16-.205.349-.39.527-.58M4.587 21.62l-1.14-1.129l-1.085-1.142c-.643-.643-.272-1.286.046-1.605L3.89 16.26l3.856 3.873l-1.518 1.491c-.53.433-.895.566-1.608 0m1.603-7.7c-.39-.465-1.15-1.301-2.262-.127c-.178.189-.366.374-.527.58c-.595.887.11 1.551.518 1.918l3.876 3.875c.377.465 1.089.971 1.83.36c.202-.165.383-.356.568-.54c1.146-1.134.279-1.863-.195-2.243z"></path>
        </g>
    </svg>)
}


export default PersonalRecords