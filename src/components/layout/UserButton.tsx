"use client"
import { IUser } from '@/db/types/user.type';
import { createClient } from '@/utils/supabase/client';
import { Avatar, Group, Menu, Skeleton, Text, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import classes from './UserButton.module.css';

export default function UserButton({ user }: { user: IUser | null }) {
  const matches = useMediaQuery('(max-width: 48em)');
  const supabase = createClient()

  const handleSignout = async () => {
    await supabase.auth.signOut().finally(() => {
      redirect('/auth/signin')
    })
  }

  if (!user) {
    return (
      <UnstyledButton className={classes.user} h="100%">
        <Group>
          <Skeleton height={40} width={40} circle />
          <div style={{ flex: 1 }}>
            <Skeleton height={10} width="60%" mb={4} />
            <Skeleton height={8} width="40%" />
          </div>
          <Skeleton height={14} width={14} />
        </Group>
      </UnstyledButton>
    );
  }

  return (
    <Menu position={matches ? "top" : "left"} withArrow>
      <Menu.Target>
        <UnstyledButton className={classes.user} h="100%">
          <Group>
            <Avatar
              src={user.avatarUrl || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"}
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user.firstName} {user.lastName}
              </Text>

              <Text c="dimmed" size="xs">
                {user.email}
              </Text>
            </div>

            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown w={200}>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item color='red' rightSection={<IconLogout size={14} />} onClick={handleSignout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
