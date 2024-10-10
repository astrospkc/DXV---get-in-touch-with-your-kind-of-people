ALTER TABLE "chat_table" DROP CONSTRAINT "chat_table_groupAdmin_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "messages_table" DROP CONSTRAINT "messages_table_sender_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "messages_table" ALTER COLUMN "sender" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "chat_table" ADD COLUMN "users_info" jsonb[];--> statement-breakpoint
ALTER TABLE "chat_table" ADD COLUMN "group_admin" jsonb;--> statement-breakpoint
ALTER TABLE "messages_table" ADD COLUMN "sender_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "messages_table" ADD COLUMN "chat" jsonb;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages_table" ADD CONSTRAINT "messages_table_sender_id_users_table_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "chat_table" DROP COLUMN IF EXISTS "groupAdmin";--> statement-breakpoint
ALTER TABLE "messages_table" DROP COLUMN IF EXISTS "chat_id";