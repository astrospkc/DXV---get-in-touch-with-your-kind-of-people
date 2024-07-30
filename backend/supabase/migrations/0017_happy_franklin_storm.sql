CREATE TABLE IF NOT EXISTS "group_member_table" (
	"member_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	"member_name" text NOT NULL,
	"member_email" text NOT NULL,
	"member_username" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
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
