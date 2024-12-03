import { integer, pgTable, serial, primaryKey, text } from "drizzle-orm/pg-core";
import usersTable from "./users";
import { timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const connectionTable = pgTable('connections', {
    id: serial('id').primaryKey(),

    follower_id: integer('follower_id').references(() => usersTable.id),
    followee_id: integer('following_id').references(() => usersTable.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),

})

export const followsRelations = relations(connectionTable, ({ one }) => ({
    follower: one(usersTable, {
        fields: [connectionTable.follower_id],
        references: [usersTable.id]
    }),
    followee: one(usersTable, {
        fields: [connectionTable.following_id],
        references: [usersTable.id]
    })
}));
export default connectionTable