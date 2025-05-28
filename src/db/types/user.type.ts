import { InferSelectModel } from "drizzle-orm";
import { users } from "../schema";

export type IUser = InferSelectModel<typeof users>;