import { getUser } from '@/actions/users/getUser'
import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import { SessionNavBar } from './sidebar'

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getUser()
  if (!user) {
    return redirect('/auth/signin')
  }
  return (
    <div className='relative'>
      <SessionNavBar user={user} />
      <div className='pl-[3.05rem]'>
        <div className='h-[54px] border-b p-4 flex items-center'>
          {/* Header content */}
        </div>
        <div className='container mx-auto realtive'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout