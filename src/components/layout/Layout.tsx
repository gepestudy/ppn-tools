import { getUser } from '@/actions/users/getUser'
import React, { PropsWithChildren } from 'react'
import DashboardLayout from './DashboardLayout'

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getUser()
  return (
    <DashboardLayout user={user}>{children}</DashboardLayout>
  )
}

export default Layout