"use client"
import { createClient } from '@/utils/supabase/client'
import { Box, Center, Group, LoadingOverlay, Notification, Paper, Text } from '@mantine/core'
import { GoogleButton } from './GoogleButton'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { IconX } from '@tabler/icons-react'

const SigninForm = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string | null>(null)
  const searchParams = useSearchParams().get('redirectTo')
  const callbackUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`)

  const handleSignin = async () => {
    setLoading(true)
    if (searchParams) {
      callbackUrl.searchParams.set('redirectTo', searchParams)
    }

    const supabase = createClient()
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
    <Center maw="100%" mah="100%">
      <Box>
        {errors && (
          <Notification icon={<IconX />} color="red" title="Opps!" mb="md" onClose={() => setErrors(null)}>
            Something went wrong
          </Notification>
        )}
        <Paper w={400} radius="md" p="lg" withBorder pos="relative">
          <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          <Text size="lg" fw={500}>
            Welcome, Signin with
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton onClick={handleSignin} radius="xl">Google</GoogleButton>
          </Group>
        </Paper>
      </Box>
    </Center>
  )
}

export default SigninForm