"use client"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import SubmitButton from '@/components/ui/submitButton'
import { cn } from '@/lib/utils'
import { useDisclosure } from "@mantine/hooks"
import { CheckCircle, XCircle } from 'lucide-react'
import { useActionState } from 'react'
import { createVirtualAccount } from './actions'

const channels: { value: string, label: string, defaultChechked: boolean, disable?: boolean }[] = [//(CIMB, PERMATA, MANDIRI, BSI, BNI, BCA, BRI)
  {
    value: "CIMB",
    label: "CIMB",
    defaultChechked: true
  },
  {
    value: "PERMATA",
    label: "PERMATA",
    defaultChechked: true
  },
  {
    value: "MANDIRI",
    label: "MANDIRI",
    defaultChechked: true
  },
  {
    value: "BSI",
    label: "BSI",
    defaultChechked: true
  },
  {
    value: "BNI",
    label: "BNI",
    defaultChechked: true
  },
  {
    value: "BRI",
    label: "BRI",
    defaultChechked: true
  },
  {
    value: "BCA",
    label: "BCA",
    disable: false,
    defaultChechked: false
  }
]

const ButtonCreate = () => {
  const [actionState, action] = useActionState(createVirtualAccount, undefined)
  const [drawerOpen, handlerDrawerOpen] = useDisclosure()

  return (
    <Drawer direction='bottom' dismissible={false} open={drawerOpen} onOpenChange={handlerDrawerOpen.toggle} autoFocus={drawerOpen}>
      <DrawerTrigger className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}>Create Virtual Accounts</DrawerTrigger>
      <DrawerContent className=''>
        <DrawerHeader>
          <DrawerTitle>Create Virtual Accounts</DrawerTitle>
          <DrawerDescription>You can create multiple Virtual Account</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className='p-3 h-110'>
          <form action={action}>
            <div>
              <Label
                htmlFor="expected_amount"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Amount
              </Label>
              <div className="relative mt-2">
                <Input
                  id="expected_amount"
                  className="peer pe-12 ps-9"
                  placeholder="15.000"
                  type="text"
                  name='expected_amount'
                  inputMode='numeric'
                  onChange={(e) => {
                    if (e.target.value === "" || e.target.value === "0") {
                      e.target.value = "";
                      return;
                    }
                    const raw = e.target.value.replace(/\D/g, "");
                    const formatted = new Intl.NumberFormat("id-ID").format(Number(raw));
                    e.target.value = formatted;
                  }}
                  defaultValue={actionState?.fields?.expectedAmount || "15.000"}
                />
                <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                  Rp.
                </span>
                <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                  IDR
                </span>
              </div>
              {actionState?.errors?.properties?.expectedAmount && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {actionState.errors.properties.expectedAmount.errors[0]}
                </p>
              )}
            </div>
            <div className='mt-2'>
              <Label
                htmlFor="channels"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Select Virtual Accounts
              </Label>
              <div className='grid grid-cols-2'>
                {channels.map((channel, index) => (
                  <div key={channel.label} className='flex items-center gap-2'>
                    <Checkbox
                      name='channels'
                      id={channel.label}
                      disabled={channel.disable}
                      value={channel.value}
                      defaultChecked={channel.defaultChechked}
                      checked={
                        actionState?.fields?.channels?.includes(channel.value)
                      }
                    />
                    <Label htmlFor={channel.label} className="text-sm font-medium text-foreground dark:text-foreground">
                      {channel.label}
                    </Label>
                  </div>
                ))}
              </div>
              {actionState?.errors?.properties?.channels && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {actionState.errors.properties.channels.errors[0]}
                </p>
              )}
            </div>
            <Separator className="my-5" />
            <div className="flex flex-col gap-2">
              <SubmitButton className='w-full' />
              <DrawerClose asChild onClick={handlerDrawerOpen.close}>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </div>
          </form>
          {actionState?.data && actionState?.data.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Results</h3>

              {actionState.data.map(({ channel, success, error }) => (
                <Alert
                  key={channel}
                  variant={success ? "default" : "destructive"}
                  className="flex items-start gap-3"
                >
                  {success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <div className="flex-1">
                    <AlertTitle className="flex justify-between items-center">
                      <span>{channel}</span>
                      {success ? (
                        <span className="text-green-600 font-semibold">Success</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Failed</span>
                      )}
                    </AlertTitle>
                    {!success && error && (
                      <AlertDescription>
                        <p>{error.message}</p>
                        {error.fields &&
                          Object.entries(error.fields).map(([field, errors]) => (
                            <p key={field} className="text-sm">
                              <strong>{field}:</strong> {errors.join(", ")}
                            </p>
                          ))}
                      </AlertDescription>
                    )}
                  </div>
                </Alert>
              ))}
            </div>
          )}
        </ScrollArea>
      </DrawerContent>
    </Drawer >
  )
}

export default ButtonCreate