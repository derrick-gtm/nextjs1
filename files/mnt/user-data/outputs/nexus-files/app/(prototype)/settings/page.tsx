"use client";

import { useState } from "react";
import { User, Bell, CalendarDays, Shield, CreditCard, Check, AlertCircle, Globe, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, Badge, Button, HealthScore } from "../ui";
import { MOCK_USER, MOCK_ORGS } from "../mock";

type SettingsTab = "profile" | "notifications" | "calendar" | "security" | "billing";

const TABS: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profile",       label: "Profile",        icon: User         },
  { id: "notifications", label: "Notifications",   icon: Bell         },
  { id: "calendar",      label: "Calendar",        icon: CalendarDays },
  { id: "security",      label: "Security",        icon: Shield       },
  { id: "billing",       label: "Billing",         icon: CreditCard   },
];

function ProfileTab() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-6 max-w-xl">
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Profile photo</h3>
        <div className="flex items-center gap-5">
          <Avatar name={MOCK_USER.name} size="xl" />
          <div className="space-y-2">
            <Button variant="secondary" size="sm">Upload new photo</Button>
            <p className="text-xs text-gray-500">JPG, PNG, or GIF. Max 2MB.</p>
          </div>
        </div>
      </div>
      <div className="glass rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white">Personal information</h3>
        {[
          { label: "Full name",  value: MOCK_USER.name,  multiline: false },
          { label: "Username",   value: "jordan.rivera", multiline: false },
          { label: "Email",      value: MOCK_USER.email, multiline: false },
          { label: "Bio",        value: "Civic tech enthusiast and community organizer based in Riverside, CA.", multiline: true },
        ].map(f => (
          <div key={f.label}>
            <label className="text-xs text-gray-500 font-medium block mb-1.5">{f.label}</label>
            {f.multiline
              ? <textarea defaultValue={f.value} rows={3} className="w-full px-3 py-2.5 rounded-xl text-sm bg-surface-overlay border border-surface-border text-white outline-none focus:border-nexus-700 resize-none transition-colors" />
              : <input defaultValue={f.value} className="w-full h-9 px-3 rounded-xl text-sm bg-surface-overlay border border-surface-border text-white outline-none focus:border-nexus-700 transition-colors" />}
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          {[["City","Riverside"],["State","CA"]].map(([l,v]) => (
            <div key={l}>
              <label className="text-xs text-gray-500 font-medium block mb-1.5">{l}</label>
              <input defaultValue={v} className="w-full h-9 px-3 rounded-xl text-sm bg-surface-overlay border border-surface-border text-white outline-none focus:border-nexus-700 transition-colors" />
            </div>
          ))}
        </div>
        <Button variant="primary" size="sm" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
          {saved ? <><Check className="h-3.5 w-3.5" />Saved</> : "Save changes"}
        </Button>
      </div>
      <div className="glass rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white">My organizations</h3>
        <div className="space-y-3">
          {MOCK_ORGS.map(org => (
            <div key={org.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface-overlay">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0" style={{ background: org.color }}>{org.name[0]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{org.name}</p>
                <p className="text-xs text-gray-500">{org.role} · {org.member_count} members</p>
              </div>
              <Badge variant={org.role === "Owner" ? "info" : org.role === "Admin" ? "warning" : "default"}>{org.role}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const NOTIF_PREFS = [
  { section: "Events",       items: [
    { label: "New event published",  desc: "When an org you're in creates a new event",   email: true,  inApp: true  },
    { label: "Event reminders",      desc: "24 hours before events you've RSVPd to",      email: true,  inApp: true  },
    { label: "Event cancelled",      desc: "When a going/maybe event is cancelled",       email: true,  inApp: true  },
    { label: "RSVP confirmations",   desc: "When your RSVP is confirmed",                 email: false, inApp: true  },
  ]},
  { section: "Announcements", items: [
    { label: "New announcements",    desc: "When your org posts an announcement",         email: false, inApp: true  },
  ]},
  { section: "Membership",   items: [
    { label: "Membership invites",   desc: "When someone invites you to an org",          email: true,  inApp: true  },
    { label: "Member joins",         desc: "When a new member joins (admin only)",        email: false, inApp: false },
  ]},
  { section: "Volunteer",    items: [
    { label: "Signup confirmed",     desc: "When your volunteer signup is accepted",      email: false, inApp: true  },
    { label: "Hours verified",       desc: "When your service hours are verified",        email: false, inApp: true  },
  ]},
];

function NotificationsTab() {
  const [prefs, setPrefs] = useState(() =>
    NOTIF_PREFS.flatMap(s => s.items).reduce((acc, item) => {
      acc[item.label] = { email: item.email, inApp: item.inApp };
      return acc;
    }, {} as Record<string, { email: boolean; inApp: boolean }>)
  );
  function toggle(label: string, ch: "email" | "inApp") {
    setPrefs(prev => ({ ...prev, [label]: { ...prev[label], [ch]: !prev[label][ch] } }));
  }
  return (
    <div className="space-y-6 max-w-2xl">
      {NOTIF_PREFS.map(section => (
        <div key={section.section} className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">{section.section}</h3>
          <div className="divide-y divide-surface-border">
            {section.items.map(item => (
              <div key={item.label} className="flex items-center gap-4 py-3.5">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  {(["inApp","email"] as const).map(ch => (
                    <div key={ch} className="flex flex-col items-center gap-1.5">
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">{ch === "inApp" ? "In-app" : "Email"}</p>
                      <button onClick={() => toggle(item.label, ch)} role="switch" aria-checked={prefs[item.label]?.[ch]}
                        className={cn("h-5 w-9 rounded-full relative transition-all", prefs[item.label]?.[ch] ? "bg-nexus-600" : "bg-surface-border")}>
                        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all shadow-sm", prefs[item.label]?.[ch] ? "left-4" : "left-0.5")} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CalendarTab() {
  const providers = [
    { name: "Google Calendar",        icon: "🗓",  status: "available"   as const, desc: "Add events via the button on any event page." },
    { name: "Apple Calendar",         icon: "🍎",  status: "available"   as const, desc: "Download .ics files from any event page."     },
    { name: "Outlook",                icon: "📧",  status: "available"   as const, desc: "Add directly to Outlook Web or desktop."      },
    { name: "Google Calendar Sync",   icon: "🔄",  status: "coming_soon" as const, desc: "Two-way sync — events update automatically."  },
    { name: "CalDAV Subscription",    icon: "📡",  status: "coming_soon" as const, desc: "Subscribe to a live feed from any calendar."  },
  ];
  return (
    <div className="space-y-6 max-w-xl">
      <div className="glass rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-white">Quick export</h3>
        <p className="text-sm text-gray-400 leading-relaxed">Click <strong className="text-white">Add to calendar</strong> on any event page, then choose your app.</p>
        <div className="flex items-start gap-2 px-3 py-3 rounded-xl bg-nexus-600/10 border border-nexus-600/20">
          <Globe className="h-4 w-4 text-nexus-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400"><strong className="text-nexus-300">Tip:</strong> The calendar button on each event supports one-click export.</p>
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Calendar apps</h3>
        <div className="space-y-2">
          {providers.map(p => (
            <div key={p.name} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-surface-overlay">
              <span className="text-xl shrink-0">{p.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-xs text-gray-500">{p.desc}</p>
              </div>
              {p.status === "coming_soon" ? <Badge variant="warning">Soon</Badge> : <Badge variant="success">Available</Badge>}
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Org calendar feeds</h3>
          <Badge variant="warning">Coming soon</Badge>
        </div>
        <div className="space-y-2">
          {MOCK_ORGS.map(org => (
            <div key={org.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-overlay opacity-60">
              <div className="h-5 w-5 rounded flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ background: org.color }}>{org.name[0]}</div>
              <p className="text-xs text-gray-400 flex-1 font-mono truncate">nexus-os.app/api/calendar/feeds/{org.slug}.ics</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-6 max-w-xl">
      <div className="glass rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white">Password</h3>
        {["Current password","New password","Confirm new password"].map(label => (
          <div key={label}>
            <label className="text-xs text-gray-500 font-medium block mb-1.5">{label}</label>
            <input type="password" placeholder="••••••••" className="w-full h-9 px-3 rounded-xl text-sm bg-surface-overlay border border-surface-border text-white placeholder:text-gray-600 outline-none focus:border-nexus-700 transition-colors" />
          </div>
        ))}
        <Button variant="primary" size="sm">Update password</Button>
      </div>
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Two-factor authentication</h3>
          <Badge variant="warning">Not enabled</Badge>
        </div>
        <p className="text-sm text-gray-400">Add an extra layer of security to your account.</p>
        <div className="flex items-start gap-2 px-3 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300">Enabling 2FA is strongly recommended for org owners and admins.</p>
        </div>
        <Button variant="outline" size="sm">Enable 2FA</Button>
      </div>
      <div className="glass rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-white">Active sessions</h3>
        {[
          { device: "MacBook Pro — Chrome", location: "Riverside, CA", current: true,  last: "Active now"  },
          { device: "iPhone 15 — Safari",   location: "Los Angeles, CA", current: false, last: "2 days ago" },
        ].map(s => (
          <div key={s.device} className="flex items-center gap-3 p-3 rounded-xl bg-surface-overlay">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{s.device}</p>
              <p className="text-xs text-gray-500">{s.location} · {s.last}</p>
            </div>
            {s.current ? <Badge variant="success">Current</Badge> : <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">Revoke</Button>}
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-nexus-600/10 border border-nexus-600/20">
        <Globe className="h-4 w-4 text-nexus-400 shrink-0" />
        <p className="text-xs text-nexus-300">Billing is managed at the <strong>organization level</strong>. Select an org below to manage its plan.</p>
      </div>
      <div className="space-y-3">
        {MOCK_ORGS.map(org => (
          <div key={org.id} className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0" style={{ background: org.color }}>{org.name[0]}</div>
                <div>
                  <p className="font-semibold text-white text-sm">{org.name}</p>
                  <p className="text-xs text-gray-500">{org.role}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-black text-white">{org.plan}</p>
                <p className="text-xs text-gray-500">{org.plan === "Free" ? "Free forever" : org.plan === "Pro" ? "$29/mo" : "$79/mo"}</p>
              </div>
            </div>
            {["Owner","Admin"].includes(org.role) && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-border">
                <Button variant="secondary" size="sm">Manage billing</Button>
                {org.plan === "Free" && <Button variant="primary" size="sm">Upgrade to Pro</Button>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("profile");
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white tracking-tight">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your account, notifications, and preferences.</p>
      </div>
      <div className="flex gap-6">
        <nav className="w-48 shrink-0 space-y-0.5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={cn("w-full flex items-center gap-3 px-3 h-9 rounded-lg text-sm transition-all text-left",
                tab === id ? "bg-nexus-600/15 text-nexus-300 font-medium" : "text-gray-400 hover:text-white hover:bg-surface-overlay")}>
              <Icon className="h-4 w-4 shrink-0" />{label}
            </button>
          ))}
        </nav>
        <div className="flex-1 min-w-0">
          {tab === "profile"       && <ProfileTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "calendar"      && <CalendarTab />}
          {tab === "security"      && <SecurityTab />}
          {tab === "billing"       && <BillingTab />}
        </div>
      </div>
    </div>
  );
}
