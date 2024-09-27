import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

import { tweetTable } from "./index";
import { usersTable } from "./index";
export const like = pgTable('likes_table', {
    id: serial('id').primaryKey(),
    tweet_id: integer('tweet_id').notNull().references(() => tweetTable.id),
    user_id: integer('user_id').notNull().references(() => usersTable.id),
    createdAt: timestamp('liked_At').notNull().defaultNow()
})



export default like