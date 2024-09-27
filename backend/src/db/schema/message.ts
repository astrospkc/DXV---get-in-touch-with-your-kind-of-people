import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { usersTable } from "./index";
import { chat } from "./index"
import { relations } from "drizzle-orm";
export const message = pgTable("messages_table", {
    id: serial("id").notNull().primaryKey(), // Auto-incrementing primary key
    sender: integer("sender") // Store sender ID as an integer (assuming user IDs are integers)
        .references(() => usersTable.id), // Reference to users table
    content: text("content"), // Content of the message
    chat: integer("chat_id") // Store chat ID as an integer (assuming chat IDs are integers)
    , // Reference to chats table if defined
    createdAt: timestamp("created_at").defaultNow().notNull(), // Created timestamp
});

export const messageRelations = relations(message, ({ one }) => ({
    sender: one(usersTable, {
        fields: [message.sender],
        references: [usersTable.id]
    }),

}))


export default message