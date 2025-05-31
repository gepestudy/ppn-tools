import { getUser } from '@/actions/users/getUser'
import { cn } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { SessionNavBar } from './sidebar'

const Layout = async ({ children, className }: {
  children: ReactNode;
  className?: string;
}) => {
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
        <div className={cn('container mx-auto relative px-2 py-5', className)}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout