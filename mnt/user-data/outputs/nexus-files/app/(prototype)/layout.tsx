"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User2, Building2, CalendarDays, List,
  Bell, ChevronRight, LogOut, Globe, Search, Users, Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "./ui";
import { MOCK_USER, ACTIVE_ORG } from "./mock";

const NAV = [
  { label: "My Hub",       href: "/hub",           icon: User2        },
  { label: "Organization", href: "/org",            icon: Building2    },
  { label: "Members",      href: "/members",        icon: Users        },
  { label: "Events",       href: "/events",         icon: List         },
  { label: "Calendar",     href: "/calendar",       icon: CalendarDays },
  { label: "Discover",     href: "/discover",       icon: Globe        },
  { label: "Settings",     href: "/settings",       icon: Settings2    },
];

const LABELS: Record<string, string> = {
  hub: "My Hub", org: ACTIVE_ORG.name, members: "Members",
  events: "Events", calendar: "Calendar", discover: "Discover",
  settings: "Settings", notifications: "Notifications",
};

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col h-full w-60 border-r border-surface-border bg-surface-raised shrink-0">
      <div className="h-14 flex items-center px-5 border-b border-surface-border shrink-0">
        <Link href="/hub" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <span className="h-7 w-7 rounded-lg bg-nexus-600 flex items-center justify-center text-xs font-black text-white">N</span>
          <span className="gradient-text text-base font-black tracking-tight">NEXUS OS</span>
        </Link>
      </div>

      <div className="px-3 py-3 border-b border-surface-border">
        <p className="text-[10px] text-gray-600 px-1 mb-2 font-semibold uppercase tracking-widest">Active org</p>
        <Link href="/org" className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-surface-overlay transition-colors group">
          <div className="h-7 w-7 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0" style={{ background: ACTIVE_ORG.color }}>
            {ACTIVE_ORG.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{ACTIVE_ORG.name}</p>
            <p className="text-[10px] text-gray-500">{ACTIVE_ORG.role} · {ACTIVE_ORG.plan}</p>
          </div>
          <ChevronRight className="h-3 w-3 text-gray-600 group-hover:text-gray-400" />
        </Link>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} className={cn(
              "flex items-center gap-3 px-3 h-9 rounded-lg text-sm transition-all duration-150",
              active ? "bg-nexus-600/15 text-nexus-300 font-medium" : "text-gray-400 hover:text-white hover:bg-surface-overlay",
            )}>
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
              {active && <ChevronRight className="h-3 w-3 ml-auto text-nexus-500" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-surface-border shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-surface-overlay transition-colors group">
          <Avatar name={MOCK_USER.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{MOCK_USER.name}</p>
            <p className="text-[10px] text-gray-500 truncate">{MOCK_USER.email}</p>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:text-red-400 text-gray-500 hover:bg-red-500/10">
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  const pathname = usePathname();
  const segments = pathname.replace(/^\//, "").split("/").filter(Boolean);
  return (
    <header className="h-14 px-6 flex items-center justify-between border-b border-surface-border bg-surface-raised shrink-0">
      <nav className="flex items-center gap-1.5 text-sm">
        <span className="text-gray-500">NEXUS OS</span>
        {segments.map((seg, i) => (
          <span key={seg} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
            <span className={i === segments.length - 1 ? "text-white font-medium capitalize" : "text-gray-400 capitalize"}>
              {LABELS[seg] ?? seg}
            </span>
          </span>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-overlay transition-colors">
          <Search className="h-4 w-4" />
        </button>
        <Link href="/notifications" className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-overlay transition-colors flex items-center">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-nexus-500 animate-pulse-slow" />
        </Link>
        <Avatar name={MOCK_USER.name} size="sm" />
      </div>
    </header>
  );
}

export default function PrototypeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/discover") return <>{children}</>;
  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-surface">
          <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
