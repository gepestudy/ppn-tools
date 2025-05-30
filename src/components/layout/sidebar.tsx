"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IUser } from "@/db/types/user.type";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import {
  ChevronsUpDown,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  QrCode,
  Settings,
  UserCircle,
  Wallet
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarItem } from "./sidebarItem";

const sidebarVariants = {
  open: {
    width: "15rem",
  },
  closed: {
    width: "3.05rem",
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  staggerChildren: 0.1,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    Icon: LayoutDashboard,
  },
  {
    label: "Virtual Account",
    href: "/virtual-accounts",
    Icon: CreditCard,
  },
  {
    label: "Wallet",
    href: "/wallets",
    Icon: Wallet,
  },
  {
    label: "QRIS",
    href: "/qris",
    Icon: QrCode,
  },
  // {
  //   label: "Library",
  //   Icon: GraduationCap,
  //   children: [
  //     {
  //       label: "Knowledge Base",
  //       href: "/library/knowledge",
  //       icon: "📚"
  //     },
  //     {
  //       label: "Document Review",
  //       href: "/library/review",
  //       Icon: FileText
  //     }
  //   ]
  // },
]


export function SessionNavBar({ user }: Readonly<{ user: IUser }>) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const supabase = createClient()


  const handleSignout = async () => {
    await supabase.auth.signOut().finally(() => {
      redirect('/auth/signin')
    })
  }

  return (
    <motion.div
      className={cn(
        "sidebar fixed left-0 z-40 h-full shrink-0 border-r",
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div
        className={`relative z-40 flex text-muted-foreground h-full shrink-0 flex-col bg-white dark:bg-black transition-all`}
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            <div className="flex h-[54px] w-full shrink-0  border-b p-2">
              <div className=" mt-[1.5px] flex w-full">
                <div className="flex w-full items-center gap-2  px-2">
                  {isCollapsed ? (
                    <Avatar className='rounded size-4'>
                      <AvatarImage src="/favicon.ico" alt="MiniLogo" width="100" height="100" />
                      <AvatarFallback>O</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-full flex justify-between items-center">
                      <Image src="/images/logo.png" width="100" height="100" alt="Logo" />
                      <Badge
                        className={cn(
                          "flex h-fit w-fit items-center gap-1.5 rounded border-none bg-blue-50 px-1.5 text-blue-600 dark:bg-blue-700 dark:text-blue-300",
                        )}
                        variant="outline"
                      >
                        BETA
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className=" flex h-full w-full flex-col">
              <div className="flex grow flex-col gap-4">
                <ScrollArea className="h-16 grow p-2">
                  <div className={cn("flex w-full flex-col gap-1")}>
                    {navItems.map((item) => (
                      <SidebarItem
                        key={item.label}
                        item={item}
                        isCollapsed={isCollapsed}
                        pathname={pathname}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="flex flex-col p-2">
                <Link
                  href="/settings/users"
                  className="mt-auto flex h-8 w-full flex-row items-center rounded-md px-2 py-1.5   transition hover:bg-muted hover:text-primary"
                >
                  <Settings className="h-4 w-4 shrink-0" />{" "}
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium">Settings</p>
                    )}
                  </motion.li>
                </Link>
                <div>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="w-full">
                      <div className="flex h-8 w-full flex-row items-center gap-2 rounded-md px-2 py-1.5  transition hover:bg-muted hover:text-primary">
                        <Avatar className="size-4">
                          <AvatarImage src={user.avatarUrl ?? "/favicon.ico"} alt="Avatar" />
                          <AvatarFallback>
                            {user.firstName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <motion.li
                          variants={variants}
                          className="flex w-full items-center gap-2"
                        >
                          {!isCollapsed && (
                            <>
                              <p className="text-sm font-medium">Account</p>
                              <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
                            </>
                          )}
                        </motion.li>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={5}>
                      <div className="flex flex-row items-center gap-2 p-2">
                        <Avatar className="size-6">
                          <AvatarImage src={user.avatarUrl ?? "/favicon.ico"} alt="Avatar" />
                          <AvatarFallback>
                            {user.firstName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        asChild
                        className="flex items-center gap-2"
                      >
                        <Link href="/settings/profile">
                          <Settings className="h-4 w-4" />Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={handleSignout}
                      >
                        <LogOut className="h-4 w-4" /> Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
type NavItem = {
  label: string;
  href?: string;
  Icon?: React.ComponentType<{ className?: string; size?: number }>;
  icon?: string;
  children?: NavItem[];
};


