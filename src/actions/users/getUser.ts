import { db } from '@/db';
import { users } from '@/db/schema';
import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user: session },
  } = await supabase.auth.getUser();
  if (!session) {
    return null
  };

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.id));
  return user[0] ?? null;
});