import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { usersTable } from "./users";
export const tweetTable = pgTable('tweet_table', {
    id: serial('id').primaryKey(),
    media_url: text('media_url'),
    content: text('content').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    userInfo: jsonb('user_info'),
    num_likes: integer('likes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
});



export default tweetTable
