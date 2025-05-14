"use client"
import React from 'react'
import { WorkoutCard } from './workout-card';
import { Textarea } from '@nextui-org/react';


import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle, DialogDescription } from '../dialog';
import { Button } from '../button';
import { shareWorkoutAction } from '~/lib/actions/socialActions';
import { toast } from 'sonner';

type Props = {
    workouts: {
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
    }[]

}

export default function WorkoutGrid({workouts}: Props) {
    const [open, setOpen] = React.useState(false)
    const [postText, setPostText] = React.useState("")
    const [workoutInfo, setWorkoutInfo] = React.useState<{workoutId:number,userId:string}>()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const handleShare = async () => {
      if (isSubmitting) return;
      try {
        setIsSubmitting(true);
        if(!workoutInfo) {return(toast("An error occurred while sharing."))}
        const res = await shareWorkoutAction(workoutInfo?.workoutId,postText,workoutInfo?.userId);
        setOpen(false);
        if(res) toast("Post shared successfully!")
        setPostText("");
      } catch (error) {
        toast("An error occurred while sharing.")
      } finally {
        setIsSubmitting(false);
      }
    }
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 p-4">
            {workouts && workouts.length > 0 ? (
                workouts.map((workout) => (
                    <WorkoutCard 
                        key={workout.id} 
                        workout={workout} 
                        handleShareEvent={(workoutInfo) => {
                            if (workoutInfo.userId) {
                                setWorkoutInfo({
                                    workoutId: workoutInfo.workoutId,
                                    userId: workoutInfo.userId
                                });
                            }
                        }}
                        handleOpenDialog={setOpen} 
                    />
                ))
            ) : (
                <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">
                        {/* {currentSearchQuery ? "No workouts match your search." : "No workouts found."} */}
                    </p>
                </div>
            )}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[95%] sm:w-[500px] max-w-[95%]">
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                    <DialogDescription>Share what's on your mind with your followers</DialogDescription>
                </DialogHeader>
                <Textarea
                    placeholder="What's on your mind athlete"
                    className="min-h-[120px] resize-none"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    name="text"
                />
                <WorkoutCard  
                    workout={workouts.find((w) => w.id === workoutInfo?.workoutId) ?? {
                        exercices: [],
                        id: 0,
                        name: '',
                        userId: null,
                        username: null,
                        description: '',
                        numberOfDays: null,
                        dayNames: [],
                        upvotes: 0
                    }}
                />
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={()=> void handleShare()}
                        disabled={isSubmitting}
                        style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
                        className="rounded-none bg-green-200 border-black border-1 px-6 py-0 text-sm text-[#353434] font-light"
                    >
                        {isSubmitting ? "SHARING..." : "SHARE"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}