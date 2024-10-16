import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { usersTable } from "./index";
import { chat } from "./index"
import { relations } from "drizzle-orm";
export const message = pgTable("messages_table", {
    id: serial("id").notNull().primaryKey(), // Auto-incrementing primary key
    sender_id: integer("sender_id").references(() => usersTable.id).notNull(),
    sender: jsonb("sender"), //sender of the message
    content: text("content"), // Content of the message
    chatId: integer("chat_id").references(() => chat.id).notNull(),
    chat: jsonb("chat"), //chat info 
    createdAt: timestamp("created_at").defaultNow().notNull(), // Created timestamp
});

export const messageRelations = relations(message, ({ one }) => ({
    sender: one(usersTable, {
        fields: [message.sender],
        references: [usersTable.id]
    }),

}))


export default message