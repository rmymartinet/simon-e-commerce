import { Calendar, Home, Inbox, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Accueil",
    url: "/auth/compte",
    icon: Home,
  },
  {
    title: "Factures",
    url: "/auth/compte/factures",
    icon: Inbox,
  },
  {
    title: "Calendrier",
    url: "/auth/compte/calendrier",
    icon: Calendar,
  },
  {
    title: "Paramètres",
    url: "/auth/compte/parametres",
    icon: Settings,
  },
];

export function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Menu principal">
      <Sidebar className="fixed left-0 top-0 hidden h-screen w-64 border-none bg-gray-900 md:block pt-40">
        <SidebarContent className="border-none bg-gray-900 text-white">
          <SidebarGroup>
            <SidebarGroupLabel className="text-white">
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={pathname === item.url ? "bg-gray-800" : ""}
                  >
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </nav>
  );
}
