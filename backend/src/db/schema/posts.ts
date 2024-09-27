import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { usersTable } from "./users";
export const postsTable = pgTable('posts_table', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    media_url: text('media_url'),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    num_likes: integer('likes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
});

export default postsTable