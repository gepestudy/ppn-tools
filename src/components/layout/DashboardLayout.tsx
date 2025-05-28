"use client"
import { AppShell, Box, Burger, Group, Image, ScrollArea, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren } from 'react';
import ColorScheme from './ColorScheme';
import Link from 'next/link';
import UserButton from './UserButton';

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} px="md">
        <Group h="100%">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Box component={Link} href='/' visibleFrom='sm'>
            <Image
              src="/images/logo.png"
              alt="Purwantara Logo"
              height={40}
            />
          </Box>
        </Group>
        <Group h="100%">
          <ColorScheme />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section p="md">Navbar header</AppShell.Section>
        <AppShell.Section grow p="md" component={ScrollArea}>
          60 links in a scrollable section
          {Array(60)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Section>
        <AppShell.Section><UserButton /></AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}