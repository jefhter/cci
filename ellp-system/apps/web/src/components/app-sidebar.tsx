"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppRole = "admin" | "professor" | "tutor" | "pendente";

const allNavItems: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles: AppRole[];
}[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "professor", "tutor"],
  },
  {
    href: "/alunos",
    label: "Alunos",
    icon: Users,
    roles: ["admin", "professor", "tutor"],
  },
  {
    href: "/oficinas",
    label: "Oficinas",
    icon: BookOpen,
    roles: ["admin", "professor", "tutor"],
  },
  {
    href: "/matriculas",
    label: "Matrículas",
    icon: ClipboardList,
    roles: ["admin", "professor", "tutor"],
  },
  {
    href: "/presenca",
    label: "Presença",
    icon: CheckSquare,
    roles: ["admin", "professor", "tutor"],
  },
  {
    href: "/relatorios",
    label: "Relatórios",
    icon: BarChart3,
    roles: ["admin", "professor", "tutor"],
  },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const navItems = allNavItems.filter(
    (item) => user?.role && item.roles.includes(user.role as AppRole),
  );

  return (
    <>
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3 border-b border-sidebar-border">
        <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
          <GraduationCap className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <div className="font-display font-bold leading-none text-sidebar-foreground">
            ELLP
          </div>
          <div className="text-[11px] text-sidebar-foreground/60 mt-0.5">
            Controle de Oficinas
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
              )}
            </Link>
          );
        })}

        {user?.role === "admin" && (
          <Link
            href="/configuracoes"
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname.startsWith("/configuracoes")
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
            )}
          >
            <Settings className="h-4 w-4" />
            Configurações
            {pathname.startsWith("/configuracoes") && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
            )}
          </Link>
        )}
      </nav>

      {/* Usuário + Sair */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="px-3 py-2 mb-1">
          <div className="text-sm font-medium truncate text-sidebar-foreground">
            {user?.email}
          </div>
          <div className="text-[11px] text-sidebar-foreground/60 capitalize mt-0.5">
            {user?.role}
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </>
  );
}

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between border-b px-4 py-3 bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="font-display font-bold text-sm">ELLP</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open && (
        <div
          className="fixed inset-0 top-[57px] z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <aside
            className="w-64 h-full bg-sidebar text-sidebar-foreground flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen sticky top-0">
      <SidebarContent />
    </aside>
  );
}
