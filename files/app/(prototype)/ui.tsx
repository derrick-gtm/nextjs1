"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin, Monitor, Users, ChevronRight, CheckCircle2,
  HelpCircle, XCircle, Clock, ArrowUpRight,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";

// ─── Avatar ───────────────────────────────────────────────────────────────────

const AV_SIZE = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export function Avatar({
  name, size = "md", className,
}: {
  name?: string | null; size?: keyof typeof AV_SIZE; className?: string;
}) {
  return (
    <div className={cn(
      "relative rounded-full overflow-hidden shrink-0 flex items-center justify-center font-semibold",
      "bg-nexus-900 border border-nexus-700/40 text-nexus-300",
      AV_SIZE[size], className,
    )}>
      {getInitials(name)}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

const BADGE_STYLES = {
  default: "bg-surface-overlay text-gray-400 border border-surface-border",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  danger:  "bg-red-500/10 text-red-400 border border-red-500/20",
  info:    "bg-nexus-500/10 text-nexus-300 border border-nexus-500/20",
  role:    "bg-nexus-900/40 text-nexus-300 border border-nexus-700/40",
};

export function Badge({
  children, variant = "default", className,
}: {
  children: React.ReactNode; variant?: keyof typeof BADGE_STYLES; className?: string;
}) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
      BADGE_STYLES[variant], className,
    )}>
      {children}
    </span>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

const BTN_VARIANT = {
  primary:   "bg-nexus-600 hover:bg-nexus-500 text-white shadow-lg shadow-nexus-900/30",
  secondary: "bg-surface-overlay hover:bg-surface-border text-white border border-surface-border",
  ghost:     "hover:bg-surface-raised text-gray-300 hover:text-white",
  outline:   "border border-nexus-600 text-nexus-400 hover:bg-nexus-600/10",
  danger:    "bg-red-600 hover:bg-red-500 text-white",
};
const BTN_SIZE = {
  sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-base rounded-xl gap-2",
};

export function Button({
  children, variant = "primary", size = "md", className, onClick, disabled,
}: {
  children: React.ReactNode; variant?: keyof typeof BTN_VARIANT; size?: keyof typeof BTN_SIZE;
  className?: string; onClick?: () => void; disabled?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed focus-ring",
        BTN_VARIANT[variant], BTN_SIZE[size], className,
      )}>
      {children}
    </button>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

export function StatCard({ label, value, sub, icon, trend }: {
  label: string; value: string | number; sub?: string;
  icon?: React.ReactNode; trend?: { value: string; positive: boolean };
}) {
  return (
    <div className="glass rounded-2xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">{label}</p>
        {icon && <div className="text-gray-600">{icon}</div>}
      </div>
      <p className="text-2xl font-black text-white leading-none">{value}</p>
      <div className="flex items-center gap-2">
        {sub && <p className="text-[11px] text-gray-500">{sub}</p>}
        {trend && (
          <span className={cn("text-[11px] font-semibold", trend.positive ? "text-emerald-400" : "text-red-400")}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

export function SectionHeader({ title, sub, action, actionHref }: {
  title: string; sub?: string; action?: string; actionHref?: string;
}) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-base font-bold text-white">{title}</h2>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
      {action && actionHref && (
        <Link href={actionHref} className="flex items-center gap-1 text-xs text-nexus-400 hover:text-nexus-300 transition-colors">
          {action}<ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

// ─── DateBlock ────────────────────────────────────────────────────────────────

export function DateBlock({ dateStr, accentColor }: { dateStr: string; accentColor?: string }) {
  const d = new Date(dateStr);
  return (
    <div className="text-center w-11 shrink-0 rounded-xl py-1.5 border"
      style={accentColor
        ? { background: accentColor + "22", borderColor: accentColor + "44" }
        : { background: "#10121e", borderColor: "#1e2236" }}>
      <p className="text-[9px] font-bold uppercase leading-none" style={{ color: accentColor ?? "#6b7280" }}>
        {d.toLocaleDateString("en-US", { month: "short" })}
      </p>
      <p className="text-xl font-black leading-tight text-white">{d.getDate()}</p>
    </div>
  );
}

// ─── CategoryPill ─────────────────────────────────────────────────────────────

const CAT_COLORS: Record<string, string> = {
  Fundraiser: "text-nexus-300 bg-nexus-500/10 border-nexus-500/20",
  Workshop:   "text-teal-300 bg-teal-500/10 border-teal-500/20",
  Volunteer:  "text-amber-300 bg-amber-500/10 border-amber-500/20",
  Meeting:    "text-gray-300 bg-gray-500/10 border-gray-500/20",
  Hackathon:  "text-purple-300 bg-purple-500/10 border-purple-500/20",
  Community:  "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  Conference: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
};

export function CategoryPill({ category }: { category: string }) {
  return (
    <span className={cn(
      "hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border",
      CAT_COLORS[category] ?? "text-gray-400 bg-gray-500/10 border-gray-500/20",
    )}>
      {category}
    </span>
  );
}

// ─── EventRow ─────────────────────────────────────────────────────────────────

type EventLike = {
  id: string; title: string; starts_at: string;
  venue_name?: string | null; location?: string | null; is_virtual: boolean;
  org: string; org_color: string; rsvp_count: number; capacity?: number | null;
  my_rsvp?: "going" | "maybe" | "not_going" | null;
  visibility: string; category: string;
};

export function EventRow({ event, showOrg = false, linkTo }: {
  event: EventLike; showOrg?: boolean; linkTo?: string;
}) {
  const timeStr = new Date(event.starts_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const displayLoc = event.is_virtual ? "Virtual" : (event.venue_name ?? event.location ?? null);

  const inner = (
    <div className="glass rounded-2xl flex items-center gap-4 px-5 py-4 transition-all duration-200 hover:border-nexus-800/60 hover:bg-surface-overlay group">
      <DateBlock dateStr={event.starts_at} accentColor={event.org_color} />
      <div className="flex-1 min-w-0 space-y-1">
        <p className="font-semibold text-sm text-white truncate group-hover:text-nexus-200 transition-colors">{event.title}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{timeStr}</span>
          {displayLoc && (
            <span className="flex items-center gap-1 truncate max-w-[180px]">
              {event.is_virtual ? <Monitor className="h-3 w-3 shrink-0" /> : <MapPin className="h-3 w-3 shrink-0" />}
              {displayLoc}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />{event.rsvp_count}{event.capacity ? `/${event.capacity}` : ""} going
          </span>
          {showOrg && <span className="font-medium hidden sm:inline" style={{ color: event.org_color }}>{event.org}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <CategoryPill category={event.category} />
        {event.my_rsvp === "going"      && <Badge variant="success">Going</Badge>}
        {event.my_rsvp === "maybe"      && <Badge variant="warning">Maybe</Badge>}
        {event.visibility === "private" && <Badge variant="default">Private</Badge>}
        {linkTo && <ArrowUpRight className="h-3.5 w-3.5 text-gray-600 group-hover:text-nexus-400 transition-colors" />}
      </div>
    </div>
  );

  if (linkTo) return <Link href={linkTo} className="block">{inner}</Link>;
  return inner;
}

// ─── RsvpButton ───────────────────────────────────────────────────────────────

export function RsvpButton({ initial = null }: { initial?: "going" | "maybe" | "not_going" | null }) {
  const [status, setStatus] = useState(initial);
  const opts = [
    { val: "going"     as const, label: "Going",    icon: <CheckCircle2 className="h-3.5 w-3.5" />, activeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
    { val: "maybe"     as const, label: "Maybe",    icon: <HelpCircle   className="h-3.5 w-3.5" />, activeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40"     },
    { val: "not_going" as const, label: "Can't go", icon: <XCircle      className="h-3.5 w-3.5" />, activeClass: "bg-red-500/20 text-red-300 border-red-500/40"           },
  ];
  return (
    <div className="flex gap-2">
      {opts.map(({ val, label, icon, activeClass }) => (
        <button key={val} onClick={() => setStatus(status === val ? null : val)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
            status === val ? activeClass : "bg-surface-overlay text-gray-400 border-surface-border hover:text-white hover:border-gray-600",
          )}>
          {icon}{label}
        </button>
      ))}
    </div>
  );
}

// ─── MemberCard ───────────────────────────────────────────────────────────────

export function MemberCard({ member }: {
  member: { id: string; name: string; email: string; role: string; status: string; title: string; hours: number };
}) {
  const roleVariant: Record<string, "info" | "warning" | "role" | "default"> = {
    Owner: "info", Admin: "warning", Moderator: "role", Member: "default",
  };
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-4 hover:border-nexus-800/60 transition-all duration-200">
      <Avatar name={member.name} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-white">{member.name}</p>
          <Badge variant={roleVariant[member.role] ?? "default"}>{member.role}</Badge>
          {member.status === "pending" && <Badge variant="warning">Pending</Badge>}
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{member.title}</p>
        <p className="text-[11px] text-gray-600 truncate">{member.email}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-black text-white">{member.hours}h</p>
        <p className="text-[10px] text-gray-600">this year</p>
      </div>
    </div>
  );
}

// ─── HealthScore ──────────────────────────────────────────────────────────────

export function HealthScore({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-red-400";
  const bar   = score >= 80 ? "bg-emerald-500"  : score >= 60 ? "bg-amber-500"   : "bg-red-500";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Health</span>
        <span className={cn("text-xl font-black", color)}>{score}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-surface-overlay overflow-hidden">
        <div className={cn("h-full rounded-full", bar)} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

// ─── CapacityBar ──────────────────────────────────────────────────────────────

export function CapacityBar({ current, max }: { current: number; max: number }) {
  const pct   = Math.min(100, Math.round((current / max) * 100));
  const color = pct >= 90 ? "bg-red-500" : pct >= 75 ? "bg-amber-500" : "bg-nexus-500";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{current} / {max} going</span>
        <span className={cn("font-semibold", pct >= 90 ? "text-red-400" : pct >= 75 ? "text-amber-400" : "text-nexus-400")}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── AnnouncementCard ─────────────────────────────────────────────────────────

export function AnnouncementCard({ ann }: {
  ann: { id: string; title: string; body: string; author: string; created_at: string; pinned: boolean; audience: string; org_color: string; org: string };
}) {
  function rel(iso: string) {
    const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000);
    const d = Math.floor(h / 24);
    if (h < 1) return "just now";
    if (h < 24) return `${h}h ago`;
    if (d < 7)  return `${d}d ago`;
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return (
    <div className="glass rounded-2xl p-5 space-y-3 hover:border-nexus-800/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {ann.pinned && <span className="text-amber-400 text-sm shrink-0 mt-0.5">📌</span>}
          <div className="min-w-0">
            <p className="font-semibold text-sm text-white leading-snug">{ann.title}</p>
            <p className="text-xs mt-0.5" style={{ color: ann.org_color }}>{ann.org}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {ann.audience === "admin" && <Badge variant="warning">Staff only</Badge>}
          <span className="text-[11px] text-gray-600 whitespace-nowrap">{rel(ann.created_at)}</span>
        </div>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{ann.body}</p>
      <div className="flex items-center gap-2 pt-1 border-t border-surface-border">
        <Avatar name={ann.author} size="xs" />
        <p className="text-xs text-gray-500">{ann.author}</p>
      </div>
    </div>
  );
}

// ─── OrgChip ──────────────────────────────────────────────────────────────────

export function OrgChip({ org }: {
  org: { name: string; member_count: number; health_score: number; color: string; plan: string };
}) {
  const hColor = org.health_score >= 80 ? "text-emerald-400" : org.health_score >= 60 ? "text-amber-400" : "text-red-400";
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-3 hover:border-nexus-800/60 transition-colors">
      <div className="h-9 w-9 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0" style={{ background: org.color }}>
        {org.name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{org.name}</p>
        <p className="text-[11px] text-gray-500">{org.member_count} members · {org.plan}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={cn("text-base font-black", hColor)}>{org.health_score}</p>
        <p className="text-[10px] text-gray-600">health</p>
      </div>
    </div>
  );
}

// ─── CatchMeUpCard ────────────────────────────────────────────────────────────

export function CatchMeUpCard() {
  const [state,   setState]   = useState<"idle" | "loading" | "done">("idle");
  const [summary, setSummary] = useState<string | null>(null);

  function generate() {
    setState("loading");
    const t = setTimeout(() => {
      setSummary(
        "Since your last visit 2 days ago:\n\n" +
        "📢 Riverside Civic Alliance posted about the Summer Gala — volunteer sign-ups open, 14/20 spots filled.\n\n" +
        '📅 React Deep Dive Workshop is at 78% capacity (31/40). You\'re marked as "maybe" — consider confirming.\n\n' +
        "🙋 Bay District Volunteers opened a new opportunity: Park Bench Restoration on Aug 3rd."
      );
      setState("done");
    }, 1600);
    return () => clearTimeout(t);
  }

  return (
    <div className="glass rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-nexus-600/20 border border-nexus-600/30 flex items-center justify-center text-sm">✨</div>
          <div>
            <p className="text-sm font-semibold text-white">AI Catch Me Up</p>
            <p className="text-[11px] text-gray-500">Summarize what you missed</p>
          </div>
        </div>
        {state === "idle"    && <button onClick={generate} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-nexus-600/20 text-nexus-300 border border-nexus-600/30 hover:bg-nexus-600/30 transition-colors">✨ Catch me up</button>}
        {state === "loading" && <p className="text-xs text-gray-400">Generating…</p>}
        {state === "done"    && <button onClick={() => { setState("idle"); setSummary(null); }} className="text-[11px] text-gray-500 hover:text-gray-300">Reset</button>}
      </div>
      {state === "idle"    && <p className="text-sm text-gray-500 leading-relaxed">Click to get a personalized summary of activity across your organizations.</p>}
      {state === "loading" && <div className="space-y-2 animate-pulse"><div className="h-3 w-full rounded-full bg-surface-overlay" /><div className="h-3 w-5/6 rounded-full bg-surface-overlay" /><div className="h-3 w-4/6 rounded-full bg-surface-overlay" /></div>}
      {state === "done" && summary && (
        <div className="text-sm text-gray-300 leading-relaxed space-y-3 pt-1 border-t border-surface-border">
          {summary.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
        </div>
      )}
    </div>
  );
}
