import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users_table', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    media_url: text('media_url').default('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'),
    password: text('password').notNull()
});


export default usersTable