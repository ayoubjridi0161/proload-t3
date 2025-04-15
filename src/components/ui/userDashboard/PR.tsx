import {TabsContent,Tabs,TabsList,TabsTrigger} from '~/components/ui/tabs'
import { andika, lalezar } from '../font'
import Container from './Container'
import {Table,TableBody,TableCell,TableHead,TableHeader, TableRow} from '~/components/ui/table'
import { Button } from '../button'
import RefreshButton from './RefreshButton'
type Props = {
    personalRecords : {
        exercise: string;
        records: number[];
    }[]
}

const PersonalRecords =(props: Props) => {
    
  return (
    <div className={`w-full ${andika.className} space-y-5 `}>
        <div className='space-y-2 p-4 '>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg '>All Personal Records</h1>
                <RefreshButton/>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
                <Table className='bg-[#f2fcf5]'>
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
        <div className='grid grid-cols-4 gap-8 '>
            <Container className='bg-white gap-3 flex items-center text-slate-700 '>
                <Medal />
                <div><h1 className='font-semibold'>Strength Builder</h1>
                <p className='text-sm text-opacity-40'>No missed workouts</p></div>
            </Container>
            <Container className='bg-white gap-3 flex items-center text-slate-700 '>
                <Medal />
                <div><h1 className='font-semibold'>Strength Builder</h1>
                <p className='text-sm text-opacity-40'>No missed workouts</p></div>
            </Container>
            <Container className='bg-white gap-3 flex items-center text-slate-700 '>
                <Medal />
                <div><h1 className='font-semibold'>Strength Builder</h1>
                <p className='text-sm text-opacity-40'>No missed workouts</p></div>
            </Container>
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
const Medal = ()=>{
    return(<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 256 256">
        <path fill="#000" d="M220 96a92 92 0 1 0-152 69.69V240a12 12 0 0 0 17.37 10.73L128 229.42l42.64 21.31A12 12 0 0 0 188 240v-74.31A91.86 91.86 0 0 0 220 96M60 96a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68m104 124.59l-30.64-15.32a12 12 0 0 0-10.74 0L92 220.58v-39.92a92 92 0 0 0 72 0ZM128 148a52 52 0 1 0-52-52a52.06 52.06 0 0 0 52 52m0-80a28 28 0 1 1-28 28a28 28 0 0 1 28-28" strokeWidth={6.5} stroke="#000"></path>
    </svg>)
}

export default PersonalRecords