import { index, pgTable, text, unique } from "drizzle-orm/pg-core";



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
