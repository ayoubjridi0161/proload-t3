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

export type publicUser = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    currentWorkout: number | null;
    likes: number[] | null;
    bio: string | null;
    details: ProfileDetails | null;
    connects: string[] | null;
    numberOfConnects: number;
}

export type ProfileDetails = {
    bmi: string;
        age: string;
        gender: string;
        height: string;
        weight: string;
        experience: string;
}

export type Exercise = {
    mg: string;
    exerciseCount: number;
  };
  
export type WorkoutDetail = {
    exercices: Exercise[]
    id: number;
    name: string;
    username: string | null | undefined;
    description: string;
    numberOfDays: number | null;
    dayNames: string[];
    upvotes: number;
}[]