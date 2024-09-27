import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";


import { tweetTable } from "./index";
import { usersTable } from "./index";
export const comment = pgTable('comments_table', {
    comment_id: serial('comment_id').notNull().primaryKey(),
    tweet_id: integer('tweet_id').notNull().references(() => tweetTable.id),
    user_id: integer('user_id').notNull().references(() => usersTable.id),
    content: text('content').notNull(),
    createdAt: timestamp('commented_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})



export default comment