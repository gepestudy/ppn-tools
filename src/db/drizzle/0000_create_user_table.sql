CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"email" text NOT NULL,
	"phone" text,
	"avatar_url" text,
	"role" text DEFAULT 'user' NOT NULL,
	"purwantara_token" text,
	"flip_api_secret" text,
	"flip_validation_token" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "users_first_name_idx" ON "users" USING btree ("first_name" text_ops);--> statement-breakpoint
CREATE INDEX "users_last_name_idx" ON "users" USING btree ("last_name" text_ops);