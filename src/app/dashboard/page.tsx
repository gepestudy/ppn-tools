import DashboardLayout from '@/components/layout/DashboardLayout'
import { createClient } from '@/utils/supabase/server'
import React from 'react'

const page = async () => {
  const { auth } = await createClient()
  const user = await auth.getUser()
  return (
    <DashboardLayout>welcome {user.data.user?.user_metadata.full_name}</DashboardLayout>
  )
}

export default page