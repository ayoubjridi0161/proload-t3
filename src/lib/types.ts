export type exercice = {
    name : string,
    sets:number,
    reps:number
}
export type day ={
    name:string,
    index:number
    
}
export type workout = {
    name:string,
    userId:string,
    description:string,
    numberOfDays:number,
    published:boolean
}

export type workoutDetails = {
    name : string,
    userId : string,
    description : string,
    numberOfDays : number,
    days : dayDetails[]
}
export type dayDetails ={
    id: number;
    name: string;
    dayIndex: number;
    workoutId: number | null;
    exercices: {
        id: number;
        name: string;
        sets: number;
        reps: number;
        dayId: number;
    }[];
}