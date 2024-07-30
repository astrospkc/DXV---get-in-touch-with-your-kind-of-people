import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    media_url: text('media_url'),
    password: text('password').notNull()
});

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

export const tweetTable = pgTable('tweet_table', {
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    num_likes: integer('likes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
});


export const groupTable = pgTable('group_table', {
    group_id: serial('group_id').primaryKey(),
    group_name: text('group_name').notNull(),
    total_members: integer('total_members').notNull(),
    group_media_url: text('media_url'),
    github_url: text('github_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export type InsertTweet = typeof tweetTable.$inferInsert;
export type SelectTweet = typeof tweetTable.$inferSelect;

export type InsertGroup = typeof groupTable.$inferInsert;
export type SelectGroup = typeof groupTable.$inferSelect;
