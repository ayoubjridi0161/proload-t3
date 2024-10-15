// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { desc, Many, relations, sql } from "drizzle-orm";
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
  text,
  boolean,
} from "drizzle-orm/pg-core";
import { number } from "zod";

import type { AdapterAccountType } from "next-auth/adapters"
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
  userId: text('user_id').references(()=>users.id),
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
  name: varchar('exercice_name',{length:256}).references(()=>exerciceNames.name).notNull(),
  sets: integer('sets').notNull(),
  reps: integer('reps').notNull(),
  dayId:integer('day_id').notNull().references(()=>days.id),
})
export const exercicesRelations= relations(exercices, ({one}) => (
  {days : one(days,{
  fields:[exercices.dayId],
  references:[days.id],
  }),
  exerciceNames: one(exerciceNames,{
    fields:[exercices.name],
    references:[exerciceNames.name]
  })
}
));

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),

})

export const usersRelations = relations(users,({many})=>({
  workouts:many(workouts),
  comments:many(comments),
  replys:many(replys),
  posts:many(Posts)
}));
export const stateEnum = pgEnum('state', ['comment', 'reply']);
export const comments = pgTable("comments",{
  id:serial('id').primaryKey(),
  content:varchar('content',{length:1000}).notNull(),
  userId:text('user_id').references(()=>users.id),
  workoutId:integer('workout_id').references(()=>workouts.id).default(-1),
  postId:integer('post_id').references(()=>Posts.id).default(-1),
  createdAt:timestamp('created_at',{withTimezone:true}).default(sql`CURRENT_TIMESTAMP`).notNull()
})
export const replys = pgTable("replys",{
  id:serial('id').primaryKey(),
  content:varchar('content',{length:1000}).notNull(),
  userId:text('user_id').references(()=>users.id),
  userName:varchar('user_name',{length:256}).notNull(),
  commentId:integer('comment_id').references(()=>comments.id),
  createdAt:timestamp('created_at',{withTimezone:true}).default(sql`CURRENT_TIMESTAMP`).notNull()
})
export const commentsRelations = relations(comments,({many,one})=>({
  users:one(users,{fields:[comments.userId],references:[users.id]}),
  workouts:one(workouts,{fields:[comments.workoutId],references:[workouts.id]}),
  replys:many(replys),
  posts:one(Posts,{fields:[comments.postId],references:[Posts.id]})
}))
export const replysRelations = relations(replys,({one})=>({
  users:one(users,{fields:[replys.userId],references:[users.id]}),
  comments:one(comments,{fields:[replys.commentId],references:[comments.id]})
}) )
export const Reactions = pgTable(
  'Reactions',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    workoutId: integer('workout_id')
      .notNull()
      .references(() => workouts.id),
    upvote: pgBoolean('upvote').default(false).notNull(),
    downvote: pgBoolean('downvote').default(false).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.workoutId] }),
  }),
);
export const ReactionsRelations = relations(Reactions, ({ one }) => ({
  workout: one(workouts, {
    fields: [Reactions.workoutId],
    references: [workouts.id],
  }),
  user: one(users, {
    fields: [Reactions.userId],
    references: [users.id],
  }),
}));
export const Posts = pgTable(
  'Posts',{
    id:serial('id').primaryKey(),
    title: varchar('title',{length:250}).notNull(),
    content:varchar('content',{length:3000}).notNull(),
    resources: text('resources').array().notNull()
    .default(sql`ARRAY[]::text[]`),
    userId : text('user_id').notNull().references(()=> users.id),
    createdAt:timestamp('created_at',{withTimezone:true}).default(sql`CURRENT_TIMESTAMP`).notNull()
    
  }
)
export const PostsRelations= relations(Posts,({many,one})=>({
  users:one(users,{fields:[Posts.userId],references:[users.id]}),
  comments:many(comments),
})
)

export const exerciceNames = pgTable(
  'exerciceNames',
  {
    name: varchar('name', { length: 256 }).notNull().primaryKey(),
    musclesTargeted: text('muscles_targeted').array().notNull().default(sql`ARRAY[]::text[]`),
    muscleGroup: varchar('muscle_group', { length: 256 }).notNull(),
    equipment:text('equipment').array().notNull().default(sql`ARRAY[]::text[]`),
    video: varchar('video', { length: 256 }),
    image: varchar('image', { length: 256 }),
  },
);
export const exerciceNamesRelations = relations(exerciceNames, ({ many }) => ({
  exercices: many(exercices),
}));


export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)