"use client"
import { WavyBackground } from '@/components/ui/wavy-background'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { redirect, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const FormLogin = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string | null>(null)

  const searchParams = useSearchParams().get('redirectTo')
  const callbackUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`)

  const supabase = createClient()

  const handleGoogle = async () => {
    setLoading(true)
    if (searchParams) {
      callbackUrl.searchParams.set('redirectTo', searchParams)
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl.toString()
      }
    })

    if (error) {
      // @ts-ignore
      console.log(error);
      setErrors(error.message)
    } else if (data.url) {
      redirect(data.url)
    }
  }
  return (
    <WavyBackground className="max-w-4xl mx-auto">
      <div className='w-full rounded-sm px-5 py-2 text-white bg-black/30 backdrop-blur-none'>
        {errors && (
          <Alert variant="destructive" className='my-3 bg-white/10 backdrop-blur-none'>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {errors}
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">Welcome Developer</h1>
          <p className="text-[1.8rem] text-white/70 font-light">Come In! </p>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="py-10"
        >
          <Button disabled={loading} onClick={handleGoogle} className="cursor-pointer animate-bounce backdrop-blur-[2px] w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full py-3 px-4 transition-colors">
            <span className="text-lg font-semibold">G</span>
            <span className='font-semibold'>Sign in with Google</span>
          </Button>
        </motion.div>
      </div>
    </WavyBackground>
  )
}

export default FormLogin