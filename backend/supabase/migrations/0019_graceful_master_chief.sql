ALTER TABLE "group_table" RENAME COLUMN "group_admin" TO "group_admin_id";--> statement-breakpoint
ALTER TABLE "group_member_table" DROP CONSTRAINT "group_member_table_group_id_group_table_group_id_fk";
--> statement-breakpoint
ALTER TABLE "group_member_table" ALTER COLUMN "member_name" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "group_table" ALTER COLUMN "group_admin_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "group_table" ALTER COLUMN "group_admin_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_member_table" ADD CONSTRAINT "group_member_table_group_id_group_table_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."group_table"("group_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_table" ADD CONSTRAINT "group_table_group_admin_id_users_table_id_fk" FOREIGN KEY ("group_admin_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
