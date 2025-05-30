'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function SubmitButton({ className, text = "Submit" }: Readonly<{ className?: string, text?: string }>) {
  const { pending } = useFormStatus()

  return (
    <Button className={cn('cursor-pointer', className)} type="submit" disabled={pending}>
      {pending ? 'Saving...' : text}
    </Button>
  )
}
