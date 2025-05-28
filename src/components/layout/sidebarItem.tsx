import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  Icon?: React.ComponentType<{ className?: string; size?: number }>;
  icon?: string;
  children?: NavItem[];
};

type SidebarItemProps = {
  item: NavItem;
  isCollapsed: boolean;
  pathname: string;
};

export function SidebarItem({ item, isCollapsed, pathname }: Readonly<SidebarItemProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname.includes(item.href ?? item.label.toLowerCase());

  const icon = item.Icon ? <item.Icon size={15} className="shrink-0" /> :
    item.icon && <span className="text-[15px] leading-none">{item.icon}</span> ||
    null;
  const label = !isCollapsed && (
    <motion.span
      className="ml-2 text-sm font-medium flex-1 text-left whitespace-nowrap"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {item.label}
    </motion.span>
  );

  const chevron = item.children && !isCollapsed && (
    <span className="ml-auto">
      {isOpen ? (
        <ChevronDown className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </span>
  );
  return (
    <div>
      {item.children ? (
        <Button
          variant="ghost"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex h-8 w-full cursor-pointer items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
            isActive && "bg-muted text-blue-600"
          )}
        >
          {icon}
          {label}
          {chevron}
        </Button>
      ) : (
        <Link
          href={item.href ?? "#"}
          className={cn(
            "flex h-8 w-full items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
            isActive && "bg-muted text-blue-600"
          )}
        >
          {icon}
          {label}
        </Link>
      )}

      {!isCollapsed && item.children && isOpen && (
        <AnimatePresence initial={false}>
          <motion.ul
            key="submenu" // key penting agar Framer bisa bedakan animasi
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeInOut" }}
            className="ml-6 mt-1 flex flex-col gap-1 overflow-hidden"
          >
            {item.children.map((child) => {
              const isChildActive = pathname.includes(child.href ?? "");
              return (
                <Link
                  key={child.href}
                  href={child.href ?? "#"}
                  className={cn(
                    "flex h-8 items-center rounded-md px-2 py-1.5 text-sm hover:bg-muted hover:text-primary",
                    isChildActive && "bg-muted text-blue-600"
                  )}
                >
                  {child.Icon && (
                    <child.Icon size={15} className="shrink-0 mr-2" />
                  )}
                  {child.icon && (
                    <span className="text-[15px] leading-none mr-2">{child.icon}</span>
                  )}
                  <span>{child.label}</span>
                </Link>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      )}
    </div>
  );
}
