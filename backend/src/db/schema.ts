import { integer, pgTable, serial, text, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';



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
    media_url: text('media_url'),
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
    group_id: serial('group_id').primaryKey().notNull(),
    group_name: text('group_name').notNull().unique(),
    groupAdminId: integer('group_adminId')
        .notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    total_members: integer('total_members').notNull(),
    group_media_url: text('media_url'),
    github_url: text('github_url').notNull().unique(),
    project_desc: text('project_desc'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})



export const groupMemberTable = pgTable('group_member_table', {
    group_member_id: integer('member_id').notNull().references(() => usersTable.id).primaryKey(),
    group_id: integer('group_id').notNull().references(() => groupTable.group_id),

    createdAt: timestamp('created_at').notNull().defaultNow(),
})

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

export const like = pgTable('likes_table', {
    id: serial('id').primaryKey(),
    tweet_id: integer('tweet_id').notNull().references(() => tweetTable.id),
    user_id: integer('user_id').notNull().references(() => usersTable.id),
    createdAt: timestamp('liked_At').notNull().defaultNow()
})



export const messages = pgTable('messages_table', {
    id: serial('id').notNull().primaryKey(),
    sender_id: integer('sender_id').references(() => usersTable.id).notNull(),
    receiver_id: integer('receiver_id').references(() => usersTable.id),
    group_id: integer('group_id').references(() => groupTable.group_id),
    content: text('content').notNull(),
    sentAt: timestamp('sentAt').notNull().defaultNow(),
    read_status: text('read_status').notNull()


})
export const chat = pgTable("chat_table", {
    id: serial("id").notNull().primaryKey(),
    chatName: text("chatName").notNull().unique(),
    isGroupChat: boolean("isGroupChat").notNull().default(false),
    users: integer("users").references(() => usersTable.id).array(),
    latestMessage: text("latestMessage"),
    latestMessageId: integer("latestMessageId").references(() => messages.id),
    groupAdmin: integer("groupAdmin").references(() => usersTable.id).notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),

})

export const notification = pgTable("notification_table", {
    id: serial("id").notNull().primaryKey(),
    sender_id: integer("sender_id").references(() => usersTable.id).notNull(),
    chat_id: integer("chat_id").references(() => usersTable.id).notNull(),
    type: text("type").notNull(),
    content: text("content").notNull(),
    isRead: boolean("isRead").notNull().default(false),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export type InsertTweet = typeof tweetTable.$inferInsert;
export type SelectTweet = typeof tweetTable.$inferSelect;

export type InsertGroup = typeof groupTable.$inferInsert;
export type SelectGroup = typeof groupTable.$inferSelect;

export type InsertMember = typeof groupMemberTable.$inferInsert;
export type SelectMember = typeof groupMemberTable.$inferSelect;

export type InsertMsg = typeof messages.$inferInsert;
export type SelectMsg = typeof messages.$inferSelect;

export type InsertChat = typeof chat.$inferInsert;
export type SelectChat = typeof chat.$inferSelect;

export type InsertNotification = typeof notification.$inferInsert;
export type SelectNotification = typeof notification.$inferSelect;

