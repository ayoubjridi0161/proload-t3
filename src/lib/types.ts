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
    cover:string | null;
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

export type UserLog = {
    id: number
    userId: string | null
    workoutId: number |null
    date: Date
    duration: number | null
    logs: unknown
    dayName:string|null
    
  }
export type WorkoutLog = {
    name: string;
    sets: { setIndex: string; weight: string }[];
  }
export type ExerciseNames = {
    video: string | null;
    name: string;
    description: string | null;
    musclesTargeted: string[];
    muscleGroup: string;
    equipment: string | null;
    images: string[];
    rating: number | null;
}[]

export type OnboardingData = {
    name: string;
    picture: string | null;
    bio: string;
    gender: string;
    age: number | "";
    height: number | "";
    weight: number | "";
    fitnessGoal: "Weight loss" | "Weight gain" | "";
    fitnessType: "Muscular fitness" | "Cardio fitness" | "";
    coverPhoto: string | null;
    step: number;
  }

export type ExtraDetails = {
    gender: string;
    age: string
    height: string
    weight: string
    fitnessGoal: string
    experience: string
    bmi: string
    fitnessLevel: string
}

export type Post = {
    id: number;
    userId: string;
    content: string;
    createdAt: string;
    likes: number;
    comments: Comment[];
    users: {
      name: string | null;
      image: string | null;
    };
    sharedPost?:{
        id: number,
        userId: string,
        content: string,
        resources: string[],
        users: {
            name: string | null,
            image: string | null,
        }
      }|undefined
      sharedWorkout?: {
        exercices: {
            mg: string;
            exerciseCount: number;
        }[];
        id: number;
        name: string;
        userId: string | null;
        username: string | null | undefined;
        description: string;
        numberOfDays: number | null;
        dayNames: string[];
        upvotes: number;
    } | null | undefined
    resources: string[];
    sharedPostId?: number | null;
    sharedWorkoutId?: number | null;
    title:string;    
    shares:number
  }
export type Comment = {
    content: string;
    id: number;
    replys?: Comment[];
    users: {
      name: string | null;
    } | null;
  };
