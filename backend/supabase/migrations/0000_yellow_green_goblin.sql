CREATE TABLE IF NOT EXISTS "chat_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"chatName" text NOT NULL,
	"isGroupChat" boolean DEFAULT false NOT NULL,
	"users" integer[],
	"users_info" jsonb[],
	"latestMessage" integer,
	"group_admin" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "chat_table_chatName_unique" UNIQUE("chatName")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments_table" (
	"comment_id" serial PRIMARY KEY NOT NULL,
	"tweet_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"content" text NOT NULL,
	"commented_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_member_table" (
	"member_id" integer PRIMARY KEY NOT NULL,
	"group_id" integer NOT NULL,
	"users" integer[],
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_table" (
	"group_id" serial PRIMARY KEY NOT NULL,
	"group_name" text NOT NULL,
	"group_adminId" integer NOT NULL,
	"total_members" integer NOT NULL,
	"media_url" text DEFAULT 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
	"github_url" text NOT NULL,
	"project_desc" text,
	"users" integer[],
	"users_info" jsonb[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "group_table_group_name_unique" UNIQUE("group_name"),
	CONSTRAINT "group_table_github_url_unique" UNIQUE("github_url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "likes_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"tweet_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"liked_At" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender_id" integer NOT NULL,
	"sender" jsonb,
	"content" text,
	"chat_id" integer NOT NULL,
	"chat" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender_id" integer NOT NULL,
	"chat_id" integer NOT NULL,
	"type" text NOT NULL,
	"content" text NOT NULL,
	"isRead" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"media_url" text,
	"user_id" integer NOT NULL,
	"likes" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tweet_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"media_url" text,
	"content" text NOT NULL,
	"user_id" integer NOT NULL,
	"user_info" jsonb,
	"likes" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"media_url" text DEFAULT 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
	"password" text NOT NULL,
	CONSTRAINT "users_table_username_unique" UNIQUE("username"),
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_table" ADD CONSTRAINT "comments_table_tweet_id_tweet_table_id_fk" FOREIGN KEY ("tweet_id") REFERENCES "public"."tweet_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments_table" ADD CONSTRAINT "comments_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_member_table" ADD CONSTRAINT "group_member_table_member_id_users_table_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_member_table" ADD CONSTRAINT "group_member_table_group_id_group_table_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group_table"("group_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_table" ADD CONSTRAINT "group_table_group_adminId_users_table_id_fk" FOREIGN KEY ("group_adminId") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes_table" ADD CONSTRAINT "likes_table_tweet_id_tweet_table_id_fk" FOREIGN KEY ("tweet_id") REFERENCES "public"."tweet_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes_table" ADD CONSTRAINT "likes_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages_table" ADD CONSTRAINT "messages_table_sender_id_users_table_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages_table" ADD CONSTRAINT "messages_table_chat_id_chat_table_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chat_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification_table" ADD CONSTRAINT "notification_table_sender_id_users_table_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification_table" ADD CONSTRAINT "notification_table_chat_id_users_table_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts_table" ADD CONSTRAINT "posts_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tweet_table" ADD CONSTRAINT "tweet_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
