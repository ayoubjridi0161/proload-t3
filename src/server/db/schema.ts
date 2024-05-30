// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
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
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `proload-t3_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);
export const workouts = pgTable("workouts",{
  id: serial('id').primaryKey(),
  name: varchar('name',{length:256}).notNull(),
  createdAt: timestamp("created_at",{withTimezone:true}).default(sql`CURRENT_TIMESTAMP`).notNull(),
  userId: uuid('user_id').notNull().references(()=>t3Users.uuid1)
})

export const workoutsRelations = relations(workouts,({many,one})=>({days : many(days),
  t3Users : one(t3Users,{
    fields : [workouts.userId],
    references:[t3Users.uuid1]
  })
}));

export const days = pgTable("days",{
  id:serial('id').primaryKey(),
  name:varchar("name",{length:256}).notNull(),
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
/*export const daysToExercices = pgTable('days_to_exercices',{
  dayId : integer('day_id').notNull().references(()=> days.id),
  exerciceId : integer('exercice_id').notNull().references(()=>exercices.id)},
  (t) => ({
    pk: primaryKey({ columns: [t.dayId, t.exerciceId] }),
  }),)
export const daysToExercicesRelations = relations(daysToExercices,({one})=>({
  exercices : one(exercices,{
    fields : [daysToExercices.exerciceId],
    references:[exercices.id]
  }),
  days : one(days , {
    fields:[daysToExercices.dayId],
    references:[days.id]
  })
}))*/
export const t3Users = pgTable('t3-users',{
  uuid1: uuid('uuid1').defaultRandom().primaryKey(),
  email: varchar('email',{length:64}).notNull(),
  password:varchar('password',{length:256}).notNull(),
  userName:varchar('user-name',{length:64})
})

export const t3UsersRelations = relations(t3Users,({many})=>({workouts : many(workouts)}))