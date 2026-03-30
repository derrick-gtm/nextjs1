"use client";

import { useState } from "react";
import { CheckCheck, Bell, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, Button } from "../ui";

type NotifType = "new_announcement" | "new_event" | "event_cancelled" | "rsvp_confirmed" | "membership_invite" | "membership_accepted" | "volunteer_signup" | "volunteer_hours_verified" | "new_discussion_reply";
type FilterCategory = "all" | "announcements" | "events" | "membership" | "volunteer" | "discussions";

interface Notification {
  id: string; type: NotifType; title: string; body: string;
  org: string; org_color: string; created_at: string; read: boolean;
}

const ALL_NOTIFICATIONS: Notification[] = [
  { id: "n01", type: "new_announcement",         title: "New announcement: Summer Gala Volunteer Sign-ups",       body: "Riverside Civic Alliance posted a new announcement — 14 of 20 volunteer spots filled.",               org: "Riverside Civic Alliance",  org_color: "#5b7cff", created_at: new Date(Date.now() -  2 * 3_600_000).toISOString(), read: false },
  { id: "n02", type: "rsvp_confirmed",            title: "RSVP confirmed: Summer Fundraiser Gala",                 body: "You're going on Fri, Jul 18. Add to your calendar so you don't forget.",                           org: "Riverside Civic Alliance",  org_color: "#5b7cff", created_at: new Date(Date.now() -  4 * 3_600_000).toISOString(), read: false },
  { id: "n03", type: "new_event",                 title: "New event: Open Source Hackathon",                       body: "Eastside Tech Collective published a new event for Aug 9–11 at Makerspace Hub.",                     org: "Eastside Tech Collective",  org_color: "#1d9e75", created_at: new Date(Date.now() - 18 * 3_600_000).toISOString(), read: false },
  { id: "n04", type: "volunteer_signup",          title: "Volunteer signup confirmed: Event Setup Crew",           body: "You're confirmed as a volunteer for the Event Setup Crew on Jul 18.",                               org: "Riverside Civic Alliance",  org_color: "#5b7cff", created_at: new Date(Date.now() -  1 * 86_400_000).toISOString(), read: true  },
  { id: "n05", type: "new_announcement",         title: "New announcement: New React 19 Learning Resources",      body: "Eastside Tech Collective shared a curated list of resources for the React 19 migration.",            org: "Eastside Tech Collective",  org_color: "#1d9e75", created_at: new Date(Date.now() -  2 * 86_400_000).toISOString(), read: true  },
  { id: "n06", type: "membership_invite",        title: "You've been invited to Bay District Volunteers",          body: "Priya Nair invited you to join Bay District Volunteers as a Member.",                               org: "Bay District Volunteers",   org_color: "#d85a30", created_at: new Date(Date.now() -  3 * 86_400_000).toISOString(), read: true  },
  { id: "n07", type: "volunteer_hours_verified", title: "Service hours verified: 6h for Park Bench Restoration",  body: "Your 6 hours for Park Bench Restoration have been verified by Marcus Webb.",                        org: "Riverside Civic Alliance",  org_color: "#5b7cff", created_at: new Date(Date.now() -  4 * 86_400_000).toISOString(), read: true  },
  { id: "n08", type: "new_discussion_reply",     title: "New reply in: React 19 migration thread",                body: "Sofia Patel replied to a thread you participated in.",                                              org: "Eastside Tech Collective",  org_color: "#1d9e75", created_at: new Date(Date.now() -  5 * 86_400_000).toISOString(), read: true  },
  { id: "n09", type: "event_cancelled",          title: "Event cancelled: Q2 Retrospective",                      body: "The Q2 Retrospective scheduled for Jun 30 was cancelled by the organizer.",                        org: "Riverside Civic Alliance",  org_color: "#5b7cff", created_at: new Date(Date.now() -  7 * 86_400_000).toISOString(), read: true  },
  { id: "n10", type: "membership_accepted",      title: "Welcome to Eastside Tech Collective!",                   body: "Your membership has been accepted. You're now an active member.",                                  org: "Eastside Tech Collective",  org_color: "#1d9e75", created_at: new Date(Date.now() - 10 * 86_400_000).toISOString(), read: true  },
];

const TYPE_CONFIG: Record<NotifType, { icon: string; category: FilterCategory }> = {
  new_announcement:         { icon: "📢", category: "announcements" },
  new_event:                { icon: "📅", category: "events"        },
  event_cancelled:          { icon: "❌", category: "events"        },
  rsvp_confirmed:           { icon: "🎟️", category: "events"       },
  membership_invite:        { icon: "👋", category: "membership"    },
  membership_accepted:      { icon: "✅", category: "membership"    },
  volunteer_signup:         { icon: "🤝", category: "volunteer"     },
  volunteer_hours_verified: { icon: "✔️", category: "volunteer"    },
  new_discussion_reply:     { icon: "💬", category: "discussions"   },
};

const FILTER_LABELS: Record<FilterCategory, string> = {
  all: "All", announcements: "Announcements", events: "Events",
  membership: "Membership", volunteer: "Volunteer", discussions: "Discussions",
};

function rel(iso: string) {
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000);
  const d = Math.floor(h / 24);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  if (d < 7)  return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);
  const [filter,        setFilter]        = useState<FilterCategory>("all");

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered    = filter === "all" ? notifications : notifications.filter(n => TYPE_CONFIG[n.type].category === filter);

  function markRead(id: string) { setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n)); }
  function markAllRead() { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); }

  const today     = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86_400_000).toDateString();
  const groups: { label: string; items: Notification[] }[] = [];
  const seen = new Set<string>();

  for (const n of filtered) {
    const d = new Date(n.created_at).toDateString();
    const label = d === today ? "Today" : d === yesterday ? "Yesterday" : "Earlier";
    if (!seen.has(label)) { seen.add(label); groups.push({ label, items: [] }); }
    groups.find(g => g.label === label)!.items.push(n);
  }

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Notifications</h1>
          <p className="text-sm text-gray-400 mt-1">
            Updates from all your organizations
            {unreadCount > 0 && <span className="ml-2 px-1.5 py-0.5 rounded-md bg-nexus-600/20 text-nexus-300 text-xs font-semibold">{unreadCount} unread</span>}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead}>
            <CheckCheck className="h-3.5 w-3.5" />Mark all read
          </Button>
        )}
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {(Object.keys(FILTER_LABELS) as FilterCategory[]).map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
              filter === cat ? "bg-nexus-600/20 text-nexus-300 border-nexus-600/30" : "text-gray-500 border-transparent hover:text-gray-300 hover:border-surface-border")}>
            {FILTER_LABELS[cat]}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-14 text-center space-y-3">
          <Bell className="h-8 w-8 text-gray-700 mx-auto" />
          <p className="font-semibold text-white">All caught up!</p>
          <p className="text-sm text-gray-500">No {filter !== "all" ? FILTER_LABELS[filter].toLowerCase() : ""} notifications yet.</p>
        </div>
      )}

      {groups.map(({ label, items }) => (
        <div key={label} className="space-y-1.5">
          <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest px-1">{label}</p>
          <div className="glass rounded-2xl overflow-hidden divide-y divide-surface-border">
            {items.map(n => {
              const cfg = TYPE_CONFIG[n.type];
              return (
                <div key={n.id}
                  className={cn("flex items-start gap-4 px-5 py-4 transition-colors hover:bg-surface-overlay cursor-pointer group", !n.read && "bg-nexus-900/20")}
                  onClick={() => markRead(n.id)}>
                  <span className="text-xl mt-0.5 shrink-0 leading-none">{cfg.icon}</span>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <p className={cn("text-sm leading-snug", !n.read ? "text-white font-semibold" : "text-gray-300")}>{n.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{n.body}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-3 w-3 rounded-sm flex items-center justify-center text-[8px] font-black text-white shrink-0" style={{ background: n.org_color }}>{n.org[0]}</div>
                      <p className="text-[11px]" style={{ color: n.org_color }}>{n.org}</p>
                      <span className="text-gray-700">·</span>
                      <p className="text-[11px] text-gray-600">{rel(n.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {!n.read && <span className="h-2 w-2 rounded-full bg-nexus-500 mt-1" />}
                    <ExternalLink className="h-3.5 w-3.5 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
