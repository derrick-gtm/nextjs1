"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Users2, CalendarDays, Megaphone,
  HandHelping, BarChart2, Settings, Plus, TrendingUp, MapPin, Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  StatCard, SectionHeader, EventRow, AnnouncementCard,
  MemberCard, HealthScore, CapacityBar, Avatar, Badge, Button,
} from "../ui";
import { ACTIVE_ORG, MOCK_EVENTS, MOCK_MEMBERS, MOCK_ANNOUNCEMENTS, VOLUNTEER_OPPS } from "../mock";

const TABS = [
  { id: "overview",      label: "Overview",      icon: LayoutDashboard },
  { id: "members",       label: "Members",        icon: Users2          },
  { id: "events",        label: "Events",          icon: CalendarDays    },
  { id: "announcements", label: "Announcements",   icon: Megaphone       },
  { id: "volunteer",     label: "Volunteer",       icon: HandHelping     },
  { id: "insights",      label: "Insights",        icon: BarChart2       },
  { id: "settings",      label: "Settings",        icon: Settings        },
];

function TabBar({ active, setActive }: { active: string; setActive: (t: string) => void }) {
  return (
    <nav className="flex items-center gap-1 border-b border-surface-border overflow-x-auto -mx-6 px-6 mb-6">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button key={id} onClick={() => setActive(id)}
          className={cn(
            "relative flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors",
            active === id ? "text-white font-medium" : "text-gray-400 hover:text-gray-200",
          )}>
          <Icon className="h-3.5 w-3.5 shrink-0" />{label}
          {active === id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-nexus-500 rounded-full" />}
        </button>
      ))}
    </nav>
  );
}

function Overview() {
  const orgEvents = MOCK_EVENTS.filter(e => e.org_slug === ACTIVE_ORG.slug).slice(0, 3);
  const orgAnns   = MOCK_ANNOUNCEMENTS.filter(a => a.org === ACTIVE_ORG.name).slice(0, 2);
  return (
    <div className="space-y-7 animate-fade-in">
      <div className="glass rounded-2xl p-6 flex items-start gap-5">
        <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-black text-white shrink-0" style={{ background: ACTIVE_ORG.color }}>
          {ACTIVE_ORG.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-black text-white">{ACTIVE_ORG.name}</h2>
            <Badge variant="info">{ACTIVE_ORG.plan}</Badge>
            <Badge variant="default">{ACTIVE_ORG.role}</Badge>
          </div>
          <p className="text-sm text-gray-400 mt-1 max-w-lg">{ACTIVE_ORG.description}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 flex-wrap">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ACTIVE_ORG.city}, {ACTIVE_ORG.state}</span>
            <span className="flex items-center gap-1"><Users2 className="h-3 w-3" />{ACTIVE_ORG.member_count} members</span>
            <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{ACTIVE_ORG.visibility}</span>
          </div>
        </div>
        <div className="shrink-0 w-24"><HealthScore score={ACTIVE_ORG.health_score} /></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Members"       value={ACTIVE_ORG.member_count} sub="+12 this month" trend={{ value: "14%", positive: true }} />
        <StatCard label="Events"        value={ACTIVE_ORG.event_count}  sub="8 upcoming" />
        <StatCard label="Service hours" value="842h" sub="This quarter"  trend={{ value: "22%", positive: true }} />
        <StatCard label="Announcements" value={MOCK_ANNOUNCEMENTS.length} sub="3 unread" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <SectionHeader title="Upcoming events" action="All events" actionHref="/events" />
          <div className="space-y-2">
            {orgEvents.map(ev => <EventRow key={ev.id} event={ev} linkTo="/events" />)}
          </div>
        </div>
        <div className="space-y-4">
          <SectionHeader title="Recent announcements" />
          <div className="space-y-3">
            {orgAnns.map(ann => <AnnouncementCard key={ann.id} ann={ann} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function MembersTab() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const roles = ["All", "Owner", "Admin", "Moderator", "Member"];
  const filtered = MOCK_MEMBERS.filter(m =>
    (roleFilter === "All" || m.role === roleFilter) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members…"
            className="h-9 px-3 rounded-xl text-sm bg-surface-overlay border border-surface-border text-white placeholder:text-gray-600 outline-none focus:border-nexus-700 w-56" />
          <div className="flex gap-1">
            {roles.map(r => (
              <button key={r} onClick={() => setRoleFilter(r)}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  roleFilter === r ? "bg-nexus-600/20 text-nexus-300 border border-nexus-600/30" : "text-gray-500 hover:text-gray-300 border border-transparent")}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <Button size="sm" variant="primary"><Plus className="h-3.5 w-3.5" />Invite member</Button>
      </div>
      <div className="space-y-2">
        {filtered.map(m => <MemberCard key={m.id} member={m} />)}
        {filtered.length === 0 && <p className="text-sm text-gray-500 text-center py-10">No members match your search.</p>}
      </div>
      <p className="text-xs text-gray-600 text-right">{filtered.length} of {MOCK_MEMBERS.length} members</p>
    </div>
  );
}

function EventsTab() {
  const orgEvents = MOCK_EVENTS.filter(e => e.org_slug === ACTIVE_ORG.slug);
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-end">
        <Button size="sm" variant="primary"><Plus className="h-3.5 w-3.5" />Create event</Button>
      </div>
      <div className="space-y-2">
        {orgEvents.map(ev => <EventRow key={ev.id} event={ev} linkTo="/events" />)}
      </div>
    </div>
  );
}

function AnnouncementsTab() {
  const anns = MOCK_ANNOUNCEMENTS.filter(a => a.org === ACTIVE_ORG.name);
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-end">
        <Button size="sm" variant="primary"><Plus className="h-3.5 w-3.5" />New announcement</Button>
      </div>
      <div className="space-y-3">{anns.map(ann => <AnnouncementCard key={ann.id} ann={ann} />)}</div>
    </div>
  );
}

function VolunteerTab() {
  return (
    <div className="space-y-4 animate-fade-in">
      <SectionHeader title="Volunteer opportunities" sub={`${VOLUNTEER_OPPS.length} active`} />
      <div className="space-y-3">
        {VOLUNTEER_OPPS.map(opp => (
          <div key={opp.id} className="glass rounded-2xl p-5 flex items-center gap-5">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-white">{opp.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">📅 {opp.date} · ⏱ {opp.hours}h estimated</p>
            </div>
            <div className="w-40 shrink-0"><CapacityBar current={opp.filled} max={opp.spots} /></div>
            {opp.filled < opp.spots
              ? <Button size="sm" variant="outline">Sign up</Button>
              : <Badge variant="danger">Full</Badge>}
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsTab() {
  const dims = [
    { label: "Membership activity", score: 23, max: 25, color: "bg-emerald-500" },
    { label: "Event engagement",    score: 22, max: 25, color: "bg-nexus-500"   },
    { label: "Communication",       score: 21, max: 25, color: "bg-amber-500"   },
    { label: "Volunteer service",   score: 21, max: 25, color: "bg-purple-500"  },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Health score"    value={`${ACTIVE_ORG.health_score}/100`} sub="Excellent" />
        <StatCard label="WAU / MAU"        value="68%"  sub="Stickiness" trend={{ value: "+5%", positive: true }} />
        <StatCard label="Events w/ RSVPs" value="92%"  sub="Adoption" />
        <StatCard label="AI Catch Me Up"  value="34"   sub="Uses (30 days)" />
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-nexus-400" />Health score breakdown
        </h3>
        <div className="space-y-4">
          {dims.map(d => (
            <div key={d.label} className="flex items-center gap-4">
              <p className="text-xs text-gray-400 w-44 shrink-0">{d.label}</p>
              <div className="flex-1 h-2 rounded-full bg-surface-overlay overflow-hidden">
                <div className={cn("h-full rounded-full", d.color)} style={{ width: `${(d.score / d.max) * 100}%` }} />
              </div>
              <p className="text-xs font-bold text-white w-10 text-right shrink-0">{d.score}/{d.max}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-5 animate-fade-in max-w-xl">
      <div className="glass rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white">Organization profile</h3>
        {[["Name", ACTIVE_ORG.name], ["Slug", ACTIVE_ORG.slug], ["City", ACTIVE_ORG.city], ["Visibility", ACTIVE_ORG.visibility]].map(([label, val]) => (
          <div key={label}>
            <label className="text-xs text-gray-500 font-medium block mb-1">{label}</label>
            <input defaultValue={val}
              className="w-full h-9 px-3 rounded-xl text-sm bg-surface-overlay border border-surface-border text-white outline-none focus:border-nexus-700" />
          </div>
        ))}
        <Button size="sm" variant="primary">Save changes</Button>
      </div>
    </div>
  );
}

export default function OrgPage() {
  const [tab, setTab] = useState("overview");
  return (
    <div className="animate-fade-in">
      <TabBar active={tab} setActive={setTab} />
      {tab === "overview"      && <Overview />}
      {tab === "members"       && <MembersTab />}
      {tab === "events"        && <EventsTab />}
      {tab === "announcements" && <AnnouncementsTab />}
      {tab === "volunteer"     && <VolunteerTab />}
      {tab === "insights"      && <InsightsTab />}
      {tab === "settings"      && <SettingsTab />}
    </div>
  );
}
