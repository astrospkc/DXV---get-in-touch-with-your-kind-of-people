CREATE TABLE IF NOT EXISTS "group_table" (
	"group_id" serial PRIMARY KEY NOT NULL,
	"group_name" text NOT NULL,
	"total_members" integer NOT NULL,
	"media_url" text,
	"github_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
