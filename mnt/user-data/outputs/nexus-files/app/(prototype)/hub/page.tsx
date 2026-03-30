"use client";

import Link from "next/link";
import { Users, CalendarDays, Megaphone, Bell, Plus, HandHelping } from "lucide-react";
import {
  StatCard, SectionHeader, EventRow, AnnouncementCard,
  OrgChip, CatchMeUpCard, Button,
} from "../ui";
import { MOCK_USER, MOCK_EVENTS, MOCK_ANNOUNCEMENTS, MOCK_ORGS, MOCK_MEMBERS } from "../mock";

const QUICK_ACTIONS = [
  { label: "New event",     icon: CalendarDays, href: "/events",  color: "text-nexus-400"   },
  { label: "Invite member", icon: Users,        href: "/members", color: "text-emerald-400" },
  { label: "Announcement",  icon: Megaphone,    href: "/org",     color: "text-amber-400"   },
  { label: "Volunteer opp", icon: HandHelping,  href: "/org",     color: "text-purple-400"  },
];

export default function HubPage() {
  const upcoming = MOCK_EVENTS.slice(0, 4);
  const anns     = MOCK_ANNOUNCEMENTS.slice(0, 3);
  const hour     = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {greeting}, {MOCK_USER.name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Active in {MOCK_ORGS.length} organizations · {MOCK_EVENTS.filter(e => e.my_rsvp === "going").length} upcoming RSVPs
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Link href="/events" className="flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" />New event
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Organizations"  value={MOCK_ORGS.length}    sub="Active memberships" icon={<Users       className="h-4 w-4" />} />
        <StatCard label="Upcoming events" value={MOCK_EVENTS.length}  sub="Next 30 days"      icon={<CalendarDays className="h-4 w-4" />} trend={{ value: "+3 this week", positive: true }} />
        <StatCard label="Members total"   value={MOCK_MEMBERS.length} sub="Across all orgs"   icon={<Users       className="h-4 w-4" />} />
        <StatCard label="Announcements"   value={MOCK_ANNOUNCEMENTS.length} sub="3 unread"    icon={<Bell        className="h-4 w-4" />} />
      </div>

      {/* Quick actions */}
      <div>
        <SectionHeader title="Quick actions" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(({ label, icon: Icon, href, color }) => (
            <Link key={label} href={href}
              className="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-nexus-800/60 hover:bg-surface-overlay transition-all duration-200 group">
              <div className="h-9 w-9 rounded-xl bg-surface-overlay flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <p className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">{label}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <CatchMeUpCard />
          <div>
            <SectionHeader title="Upcoming events" sub="From all your organizations" action="View calendar" actionHref="/calendar" />
            <div className="space-y-2">
              {upcoming.map(ev => <EventRow key={ev.id} event={ev} showOrg linkTo="/events" />)}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div>
            <SectionHeader title="My organizations" action="View all" actionHref="/org" />
            <div className="space-y-2">
              {MOCK_ORGS.map(org => (
                <Link key={org.id} href="/org" className="block"><OrgChip org={org} /></Link>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Announcements" action="See all" actionHref="/org" />
            <div className="space-y-3">
              {anns.map(ann => <AnnouncementCard key={ann.id} ann={ann} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
