"use client";
import { DashboardSideBar } from "@/components/Dashboard/DashboardSideBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CompteRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    {
      title: "Home",
      href: "/auth/compte",
    },
    {
      title: "Factures",
      href: "/auth/compte/factures",
    },
    {
      title: "Calendrier",
      href: "/auth/compte/calendrier",
    },
    {
      title: "Paramètres",
      href: "/auth/compte/parametres",
    },
    // {
    //   title: "Support",
    //   href: "/support",
    // },
  ];
  return (
    <SidebarProvider>
      <DashboardSideBar/>
      <main className="flex w-full flex-col md:flex-row">
        <div className="mb-10 mt-40 flex justify-between px-4 md:hidden gap-2">
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
