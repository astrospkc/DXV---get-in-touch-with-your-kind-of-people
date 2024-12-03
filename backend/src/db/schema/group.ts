import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";


import { usersTable } from "./index";

export const groupTable = pgTable('group_table', {
    group_id: serial('group_id').primaryKey().notNull(),
    group_name: text('group_name').unique(),
    groupAdminId: integer('group_adminId')
        .notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    total_members: integer('total_members').notNull(),
    group_media_url: text('media_url').default('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'),
    github_url: text('github_url').notNull().unique(),
    project_desc: text('project_desc'),
    // users: integer('users').references(() => usersTable.id).array(),
    users: integer("users").references(() => usersTable.id).array(),
    usersInfo: jsonb("users_info").array(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})



export default groupTable