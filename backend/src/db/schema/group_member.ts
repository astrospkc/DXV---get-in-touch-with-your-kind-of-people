import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";

import { groupTable } from "./index";
import { usersTable } from "./index";
export const groupMemberTable = pgTable('group_member_table', {
    group_member_id: integer('member_id').notNull().references(() => usersTable.id).primaryKey(),
    group_id: integer('group_id').notNull().references(() => groupTable.group_id),

    createdAt: timestamp('created_at').notNull().defaultNow(),
})


export default groupMemberTable