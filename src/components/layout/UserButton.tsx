"use client"
import { IconChevronRight, IconLogout } from '@tabler/icons-react';
import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export default function UserButton() {
  const matches = useMediaQuery('(max-width: 48em)');
  const supabase = createClient()

  const handleSignout = async () => {
    await supabase.auth.signOut().finally(() => {

      redirect('/auth/signin')
    })
  }
  return (
    <Menu position={matches ? "top" : "left"} withArrow>
      <Menu.Target>
        <UnstyledButton className={classes.user} h="100%">
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Harriette Spoonlicker
              </Text>

              <Text c="dimmed" size="xs">
                hspoonlicker@outlook.com
              </Text>
            </div>

            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown w={200}>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item color='red' rightSection={<IconLogout size={14} />} onClick={handleSignout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}