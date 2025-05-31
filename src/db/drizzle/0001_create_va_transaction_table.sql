CREATE TABLE "va_transaction" (
	"uuid" text PRIMARY KEY NOT NULL,
	"external_id" text,
	"name" text,
	"amount" integer,
	"fee" integer,
	"total" integer,
	"fee_charged_to" text,
	"va_number" text,
	"description" text,
	"expired_at" timestamp with time zone,
	"payment_code" text,
	"status" text
);
--> statement-breakpoint
CREATE INDEX "va_transaction_va_number_idx" ON "va_transaction" USING btree ("va_number" text_ops);--> statement-breakpoint
CREATE INDEX "va_transaction_payment_code_idx" ON "va_transaction" USING btree ("payment_code" text_ops);--> statement-breakpoint
CREATE INDEX "va_transaction_status_idx" ON "va_transaction" USING btree ("status" text_ops);