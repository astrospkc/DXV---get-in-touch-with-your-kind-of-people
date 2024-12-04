import message from './message';
import chat from './chat';
import comment from "./comment"
import groupTable from './group';
import groupMemberTable from './group_member';
import like from './like';
import notification from './notification';
import postsTable from './posts';
import tweetTable from './tweet';
import usersTable from "./users"
import connectionTable from './connection';
import projectTable from "./projectFile"
import { pgTable } from 'drizzle-orm/pg-core';

export { default as usersTable } from "./users"
export { default as tweetTable } from "./tweet"
export { default as chat, chatRelations } from "./chat"
export { default as comment } from "./comment"
export { default as groupMemberTable } from "./group_member"
export { default as groupTable } from "./group"
export { default as like } from "./like"
export { default as notification } from "./notification"
export { default as postsTable } from "./posts"
export { default as connectionTable } from "./connection"
export { default as projectTable } from "./projectFile"


export { default as message, messageRelations } from "./message"

export type InsertUsers = typeof usersTable.$inferInsert;
export type SelectUsers = typeof usersTable.$inferSelect;

export type InsertMsg = typeof message.$inferInsert;
export type SelectMsg = typeof message.$inferSelect;

export type InsertTweet = typeof tweetTable.$inferInsert;
export type SelectTweet = typeof tweetTable.$inferSelect;

export type InsertChat = typeof chat.$inferInsert;
export type SelectChat = typeof chat.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;


export type InsertLike = typeof like.$inferInsert;
export type SelectLike = typeof like.$inferSelect;

export type InsertGroup = typeof groupTable.$inferInsert;
export type SelectGroup = typeof groupTable.$inferSelect;

export type InsertMember = typeof groupMemberTable.$inferInsert;
export type SelectMember = typeof groupMemberTable.$inferSelect;

export type InsertComment = typeof comment.$inferInsert;
export type SelectComment = typeof comment.$inferSelect;

export type InsertNotification = typeof notification.$inferInsert;
export type SelectNotification = typeof notification.$inferSelect;

export type InsertConnection = typeof connectionTable.$inferInsert;
export type SelectConnection = typeof connectionTable.$inferSelect;

export type InsertProject = typeof projectTable.$inferInsert;
export type SelectProject = typeof projectTable.$inferSelect;