import { InferSelectModel } from "drizzle-orm";
import { index, integer, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";



export const users = pgTable("users", {
	id: text().notNull().primaryKey(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name"),
	email: text().notNull(),
	phone: text(),
	avatarUrl: text("avatar_url"),
	role: text().default('user').notNull(),
	purwantaraToken: text("purwantara_token"),
	flipApiSecret: text("flip_api_secret"),
	flipValidationToken: text("flip_validation_token"),
}, (table) => [
	index("users_first_name_idx").using("btree", table.firstName.asc().nullsLast().op("text_ops")),
	index("users_last_name_idx").using("btree", table.lastName.asc().nullsLast().op("text_ops")),
	unique("users_email_unique").on(table.email),
]);
export type IUser = InferSelectModel<typeof users>;


export const VATransaction = pgTable("va_transaction", {
	uuid: text().primaryKey(),
	externalID: text("external_id"),
	name: text("name"),
	amount: integer("amount"),
	fee: integer("fee"),
	total: integer("total"),
	feeChargedTo: text("fee_charged_to"),
	vaNumber: text("va_number"),
	description: text("description"),
	expiredAt: timestamp("expired_at", { withTimezone: true }),
	paymentCode: text("payment_code"),
	status: text("status")
}, (table) => [
	index("va_transaction_va_number_idx").using("btree", table.vaNumber.asc().nullsLast().op("text_ops")),
	index("va_transaction_payment_code_idx").using("btree", table.paymentCode.asc().nullsLast().op("text_ops")),
	index("va_transaction_status_idx").using("btree", table.status.asc().nullsLast().op("text_ops")),
]);
export type IVATransaction = InferSelectModel<typeof VATransaction>;