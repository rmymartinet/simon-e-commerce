"use client";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    {
      title: "Home",
      href: "/auth/dashboard",
    },

    {
      title: "Factures",
      href: "/auth/dashboard/invoices",
    },
    {
      title: "Calendar",
      href: "/auth/dashboard/calendar",
    },
    {
      title: "Settings",
      href: "/auth/dashboard/settings",
    },
    // {
    //   title: "Support",
    //   href: "/support",
    // },
  ];
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full flex-col md:flex-row">
        <div className="mb-10 mt-40 flex justify-between px-4 md:hidden">
          {links.map((link) => {
            const isActive = pathname === link.href; // Vérifie si la route est active

            return (
              <Button
                variant={isActive ? "whiteBg" : "default"}
                key={link.title}
                className="w-full"
              >
                <Link href={link.href}>{link.title}</Link>
              </Button>
            );
          })}
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
