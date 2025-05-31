"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import SubmitButton from '@/components/ui/submitButton'
import { useActionState, useEffect } from 'react'
import { updateUserSettings } from './actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import PasswordInput from '@/components/ui/passwordInput'
import { Tooltip } from '@/components/ui/tooltip'
import { IUser } from '@/db/schema'

const UserSettingForm = ({ user }: { user: IUser }) => {
  const [actionState, formAction] = useActionState(updateUserSettings, undefined)
  const router = useRouter()
  useEffect(() => {
    if (actionState?.success) {
      toast.success('User settings updated')
      router.refresh()
    }
  }, [actionState])
  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-foreground dark:text-foreground">
            Personal information
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
            change your personal information
          </p>
        </div>
        <div className="sm:max-w-3xl md:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <Label
                htmlFor="first-name"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                First name
              </Label>
              <Input
                type="text"
                id="first-name"
                name="firstName"
                autoComplete="given-name"
                placeholder="Emma"
                className="mt-2"
                defaultValue={actionState?.data?.firstName ?? user.firstName ?? undefined}
              />
              {actionState?.errors?.properties?.firstName && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {actionState.errors.properties.firstName.errors[0]}
                </p>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label
                htmlFor="last-name"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Last name
              </Label>
              <Input
                type="text"
                id="last-name"
                name="lastName"
                autoComplete="family-name"
                placeholder="Crown"
                className="mt-2"
                defaultValue={actionState?.data?.lastName ?? user.lastName ?? undefined}
              />
              {actionState?.errors?.properties?.lastName && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {actionState.errors.properties.lastName.errors[0]}
                </p>
              )}
            </div>
            <div className="col-span-full">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="gepe@company.com"
                className="mt-2"
                defaultValue={actionState?.data?.email ?? user.email ?? undefined}
                readOnly
              />
            </div>
            <div className="col-span-full">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Phone
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                placeholder="08123456789"
                className="mt-2"
                defaultValue={actionState?.data?.phone ?? user.phone ?? undefined}
              />
              {actionState?.errors?.properties?.phone && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {actionState.errors.properties.phone.errors[0]}
                </p>
              )}
            </div>
            <div className="col-span-full">
              <div className='grid grid-cols-5 gap-5'>
                <div className='col-span-5 md:col-span-1'>
                  <Label
                    htmlFor="role"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Role
                  </Label>
                  <Input
                    type="text"
                    id="role"
                    name="hidup-jokowi"
                    placeholder="Senior Manager"
                    readOnly
                    className="mt-2"
                    defaultValue={user.role ?? undefined}
                  />
                </div>
                <div className='col-span-5 md:col-span-4'>
                  <Label
                    htmlFor="purwantara-token"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Purwantara Token
                  </Label>
                  <PasswordInput
                    placeholder='Purwntara Token'
                    name='purwantaraToken'
                    className="mt-2"
                    defaultValue={actionState?.data?.purwantaraToken ?? user.purwantaraToken ?? undefined}
                  />
                  {actionState?.errors?.properties?.purwantaraToken && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {actionState.errors.properties.purwantaraToken.errors[0]}
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground dark:text-muted-foreground">
                Roles can only be changed by system admin.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="flex items-center justify-end space-x-4">
        <SubmitButton />
      </div>
    </form>
  )
}

export default UserSettingForm