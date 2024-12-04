
import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import groupTable from "./group";
import usersTable from "./users";


export const projectTable = pgTable('project_table', {
    id: serial("id").notNull().primaryKey(),
    project_name: text("project_name").notNull(),
    project_desc: text("project_desc"),
    project_media_url: text("project_media_url").array(),
    group_id: integer("group_id").notNull().references(() => groupTable.group_id),
    user_id: integer("user_id").notNull().references(() => usersTable.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export default projectTable