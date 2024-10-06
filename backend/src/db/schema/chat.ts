import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { usersTable } from "./index";
import { message } from "./index";
import { relations } from "drizzle-orm";

export const chat = pgTable("chat_table", {
    id: serial("id").notNull().primaryKey(),
    chatName: text("chatName").unique().notNull(),
    isGroupChat: boolean("isGroupChat").notNull().default(false),
    // users: text("users").notNull(),
    users: integer("users").references(() => usersTable.id).array(),

    latestMessage: integer("latestMessage").references(() => message.id),
    groupAdmin: integer("groupAdmin").references(() => usersTable.id).notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),

})

export const chatRelations = relations(chat, ({ one }) => ({
    user: one(usersTable, {
        fields: [chat.users],
        references: [usersTable.id],
    }),
    message: one(message, {
        fields: [chat.latestMessage],
        references: [message.id]
    })
}))

export default chat