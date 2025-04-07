// components/layout/DashboardSidebar.tsx
"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navData = [
  {
    title: "Espace utilisateur",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: "🏠" },
      { title: "Profil", href: "/account", icon: "👤" },
      { title: "Mot de passe", href: "/account/password", icon: "🔐" },
      { title: "Abonnement", href: "/account/subscription", icon: "💳" },
      { title: "Achats", href: "/account/purchases", icon: "🧾" },
      { title: "Contenus", href: "/account/content", icon: "📁" },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="hidden md:block">
      <SidebarHeader>
        <h2 className="text-xl font-bold">🏃‍♂️ Mon espace</h2>
      </SidebarHeader>
      <SidebarContent>
        {navData.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                      >
                        <span>{item.icon}</span>
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
