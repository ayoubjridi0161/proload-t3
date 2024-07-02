// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { desc, relations, sql } from "drizzle-orm";
import { boolean } from "drizzle-orm/mysql-core";
import {
  index,
  integer,
  pgTable,
  pgTableCreator,
  serial,
  timestamp,
  primaryKey,
  varchar,
  uuid,
  pgEnum,
  boolean as pgBoolean,
} from "drizzle-orm/pg-core";
import { number } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `proload-t3_${name}`);

export const workouts = pgTable("workouts",{
  id: serial('id').primaryKey(),
  name: varchar('name',{length:256}).notNull(),
  userId: uuid('user_id').references(()=>users.id),
  createdAt: timestamp("created_at",{withTimezone:true}).default(sql`CURRENT_TIMESTAMP`).notNull(),
  description:varchar('description',{length:1000}).notNull(),
  upvotes:integer('upvotes').default(0).notNull(),
  downvotes:integer('downvotes').default(0).notNull(),
  clones:integer('clones').default(0).notNull(),
  published:pgBoolean('published').default(false).notNull(),
  numberOfDays:integer('number_of_days')
})

export const workoutsRelations = relations(workouts,({many,one})=>({days : many(days),
  users: one(users,{fields:[workouts.userId],references:[users.id]}),
  comments:many(comments),

}));

export const days = pgTable("days",{
  id:serial('id').primaryKey(),
  name:varchar("name",{length:256}).notNull(),
  dayIndex:integer('day_index').notNull(),
  workoutId: integer("workout_id").references(()=>workouts.id)
});
export const daysRelations = relations(days,({one,many})=> ({
  workout : one(workouts,{
    fields :[days.workoutId],
    references:[workouts.id]
  }),
  exercices : many(exercices)  
}))
export const exercices = pgTable("exercises",{
  id:serial('id').primaryKey(),
  name: varchar('name',{length:256}).notNull(),
  sets: integer('sets').notNull(),
  reps: integer('reps').notNull(),
  dayId:integer('day_id').notNull().references(()=>days.id)
})
export const exercicesRelations= relations(exercices, ({one}) => ({days : one(days,{
  fields:[exercices.dayId],
  references:[days.id],
})})  );

export const users = pgTable("users",{
  id:uuid('uuid').defaultRandom().primaryKey(),
  username:varchar('username',{length:256}).notNull().unique(),
  email:varchar('email',{length:256}).notNull().unique(),
  password:varchar('password',{length:256}).notNull()
})
export const usersRelations = relations(users,({many})=>({workouts:many(workouts),comments:many(comments),replys:many(replys)}));
export const stateEnum = pgEnum('state', ['comment', 'reply']);
export const comments = pgTable("comments",{
  id:serial('id').primaryKey(),
  content:varchar('content',{length:1000}).notNull(),
  userId:uuid('user_id').references(()=>users.id),
  userName:varchar('user_name',{length:256}).notNull(),
  workoutId:integer('workout_id').references(()=>workouts.id),
  createdAt:timestamp('created_at',{withTimezone:true}).default(sql`CURRENT_TIMESTAMP`).notNull()
})
export const replys = pgTable("replys",{
  id:serial('id').primaryKey(),
  content:varchar('content',{length:1000}).notNull(),
  userId:uuid('user_id').references(()=>users.id),
  userName:varchar('user_name',{length:256}).notNull(),
  commentId:integer('comment_id').references(()=>comments.id),
  createdAt:timestamp('created_at',{withTimezone:true}).default(sql`CURRENT_TIMESTAMP`).notNull()
})
export const commentsRelations = relations(comments,({many,one})=>({
  users:one(users,{fields:[comments.userId],references:[users.id]}),
  workouts:one(workouts,{fields:[comments.workoutId],references:[workouts.id]}),
  replys:many(replys)
}))
export const replysRelations = relations(replys,({one})=>({
  users:one(users,{fields:[replys.userId],references:[users.id]}),
  comments:one(comments,{fields:[replys.commentId],references:[comments.id]})
}) )

