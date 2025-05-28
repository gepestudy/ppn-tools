import { Suspense } from 'react'
import FormLogin from './FormLogin'

const page = () => {
  return (
    <Suspense>
      <FormLogin />
    </Suspense>
  )
}

export default page