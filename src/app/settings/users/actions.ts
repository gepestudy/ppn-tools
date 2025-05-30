"use server"
import { getUser } from "@/actions/users/getUser";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import z from "zod/v4"


const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  phone: z
    .string()
    .min(10, { message: 'Must be a valid mobile number' })
    .max(14, { message: 'Must be a valid mobile number' }).optional().or(z.literal("")),
  purwantaraToken: z.string().optional(),
})
export async function updateUserSettings(prevState: any, formData: FormData) {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    // role: formData.get("role"),
    purwantaraToken: formData.get("purwantaraToken"),
  }

  const result = userSchema.safeParse(data);
  if (result.error) {
    return {
      success: false,
      errors: z.treeifyError(result.error),
    }
  }

  const user = await getUser();
  if (!user) {
    return {
      success: false,
      errors: {
        errors: ["User not found"]
      },
    }
  }

  const res = await db.update(users).set({
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    phone: result.data.phone,
    purwantaraToken: result.data.purwantaraToken,
  }).where(eq(users.id, user.id)).returning();

  if (res.length === 0) {
    return {
      success: false,
      errors: {
        errors: ["Opps! Something went wrong"]
      }
    }
  }



  return {
    success: true,
    data: res[0],
  }
}