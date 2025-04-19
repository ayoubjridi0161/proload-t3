"use server"
import { auth, signIn , signOut } from "auth"
import { InsertDay, InsertExercice,  InsertWorkout, addConnect, addLike, addLogs, addNewReaction, addNotification, createComment, createPost, createReply, createWorkoutComment, deleteDay, deleteRemovedExercices, editUserBio, editUserDetails, fetchAllWorkouts, fetchUserWorkouts, fetchWorkoutById, getCurrentWorkoutID, getDaysByWorkout, getExerciceByName, getFollows, getFullUser, getMuscleGroups, getNumberOfWorkoutsPerUser, getProfileByID, getSharedPostByID, getSideConnects, getUserByEmail, getUserByID, getUserLogs, getUserNotifs, getUserPrs, getUsersByName, getWorkoutDates, getWorkoutsByUser, isLiked, removeConnect, removeLike, sharePost, updateDay, updateExercice,  updateReactions,  updateUserProfile,  updateUserPrs,  updateWorkout } from "./data"
import { AuthError } from "next-auth"
import { ZodError } from "zod"
import { revalidatePath } from "next/cache"
import { DrizzleError } from "drizzle-orm"
import {S3Client } from "@aws-sdk/client-s3"
import { nanoid} from "nanoid"
import {createPresignedPost} from "@aws-sdk/s3-presigned-post"
import {type UserLog,type WorkoutLog} from "~/lib/types"




export const newsLetter = ()=>{
  console.log("hello")
}








