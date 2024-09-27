import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";


import { usersTable } from "./users";
export const notification = pgTable("notification_table", {
    id: serial("id").notNull().primaryKey(),
    sender_id: integer("sender_id").references(() => usersTable.id).notNull(),
    chat_id: integer("chat_id").references(() => usersTable.id).notNull(),
    type: text("type").notNull(),
    content: text("content").notNull(),
    isRead: boolean("isRead").notNull().default(false),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
})



export default notification