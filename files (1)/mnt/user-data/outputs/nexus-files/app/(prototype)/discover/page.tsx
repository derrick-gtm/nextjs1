"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Monitor, Users, Clock, ArrowRight, CalendarDays, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, CategoryPill, CapacityBar } from "../ui";
import { MOCK_EVENTS, MOCK_ORGS } from "../mock";

const PUBLIC_EVENTS = MOCK_EVENTS.filter(e => e.visibility === "public");
const CATEGORIES    = ["All","Fundraiser","Workshop","Volunteer","Hackathon","Community","Conference"];

function EventCard({ event }: { event: typeof MOCK_EVENTS[number] }) {
  const d      = new Date(event.starts_at);
  const locStr = event.is_virtual ? "Virtual event" : (event.venue_name ?? event.location ?? "TBD");
  const isFull = event.capacity != null && event.rsvp_count >= event.capacity;

  return (
    <div className="glass rounded-2xl overflow-hidden hover:border-nexus-800/60 transition-all duration-200 group flex flex-col">
      <div className="h-24 flex items-end p-4 shrink-0"
        style={{ background: `linear-gradient(135deg, ${event.org_color}44, ${event.org_color}11)` }}>
        <div className="flex items-center gap-2">
          <CategoryPill category={event.category} />
          {event.is_virtual && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border text-teal-300 bg-teal-500/10 border-teal-500/20">
              <Monitor className="h-3 w-3" />Virtual
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div>
          <h3 className="font-bold text-white text-sm leading-snug group-hover:text-nexus-200 transition-colors">{event.title}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="h-4 w-4 rounded flex items-center justify-center text-[9px] font-black text-white shrink-0" style={{ background: event.org_color }}>
              {event.org[0]}
            </div>
            <p className="text-xs font-medium" style={{ color: event.org_color }}>{event.org}</p>
          </div>
        </div>
        <div className="space-y-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3 text-gray-600 shrink-0" />
            <span>{d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            <span className="text-gray-700">·</span>
            <Clock className="h-3 w-3 text-gray-600 shrink-0" />
            <span>{d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {event.is_virtual ? <Monitor className="h-3 w-3 text-gray-600 shrink-0" /> : <MapPin className="h-3 w-3 text-gray-600 shrink-0" />}
            <span className="truncate">{locStr}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">{event.description}</p>
        <div className="pt-3 border-t border-surface-border space-y-3">
          {event.capacity
            ? <CapacityBar current={event.rsvp_count} max={event.capacity} />
            : <div className="flex items-center gap-1.5 text-xs text-gray-500"><Users className="h-3 w-3" /><span>{event.rsvp_count} going</span></div>}
          <Link href="/events"
            className={cn("w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all",
              isFull ? "bg-surface-overlay text-gray-500 cursor-not-allowed" : "bg-nexus-600 hover:bg-nexus-500 text-white")}>
            {isFull ? "Full — join waitlist" : "View & RSVP"}
            {!isFull && <ArrowRight className="h-3 w-3" />}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  const [search,    setSearch]    = useState("");
  const [cat,       setCat]       = useState("All");
  const [orgFilter, setOrgFilter] = useState("all");
  const publicOrgs = MOCK_ORGS.filter(o => o.visibility === "public");

  const filtered = PUBLIC_EVENTS.filter(e =>
    (cat === "All" || e.category === cat) &&
    (orgFilter === "all" || e.org_slug === orgFilter) &&
    (e.title.toLowerCase().includes(search.toLowerCase()) || e.org.toLowerCase().includes(search.toLowerCase()) || (e.location ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-surface">
      <nav className="h-14 flex items-center justify-between px-6 border-b border-surface-border bg-surface-raised sticky top-0 z-30">
        <Link href="/hub" className="flex items-center gap-2.5">
          <span className="h-7 w-7 rounded-lg bg-nexus-600 flex items-center justify-center text-xs font-black text-white">N</span>
          <span className="gradient-text text-base font-black tracking-tight">NEXUS OS</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
          <Link href="/discover" className="text-white font-medium">Discover</Link>
          <Link href="/hub" className="hover:text-white transition-colors">Dashboard</Link>
        </div>
        <Link href="/hub" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-nexus-600 hover:bg-nexus-500 text-white text-sm font-semibold transition-colors">
          Sign in<ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </nav>

      <div className="relative py-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-nexus-700/10 blur-[80px]" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-nexus-700/40 bg-nexus-900/20 text-nexus-300 text-xs font-medium mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-nexus-400 animate-pulse-slow" />
            {PUBLIC_EVENTS.length} events happening near you
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-4">
            Discover community<br /><span className="gradient-text">events near you</span>
          </h1>
          <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
            Find events from local organizations, RSVP in seconds, and build connections in your community.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events, organizations, locations…"
              className="w-full h-12 pl-11 pr-4 rounded-2xl text-sm bg-surface-raised border border-surface-border text-white placeholder:text-gray-500 outline-none focus:border-nexus-700 transition-colors" />
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 max-w-7xl mx-auto space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-gray-600 shrink-0" />
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={cn("px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
                cat === c ? "bg-nexus-600 text-white border-nexus-600" : "text-gray-400 border-surface-border hover:text-white hover:border-gray-600")}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-xs text-gray-600 font-medium">By org:</p>
          <button onClick={() => setOrgFilter("all")}
            className={cn("px-3 py-1 rounded-lg text-xs font-medium border transition-all",
              orgFilter === "all" ? "bg-white/10 text-white border-white/20" : "text-gray-500 border-transparent hover:text-gray-300")}>
            All
          </button>
          {publicOrgs.map(o => (
            <button key={o.id} onClick={() => setOrgFilter(o.slug)}
              className={cn("flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all",
                orgFilter === o.slug ? "text-white border-white/20" : "text-gray-500 border-transparent hover:text-gray-300")}
              style={orgFilter === o.slug ? { background: o.color + "33", borderColor: o.color + "55" } : {}}>
              <span className="h-2 w-2 rounded-full" style={{ background: o.color }} />
              {o.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-20 max-w-7xl mx-auto">
        <p className="text-xs text-gray-600 mb-5">{filtered.length} events found</p>
        {filtered.length === 0
          ? <div className="glass rounded-2xl p-16 text-center"><p className="text-4xl mb-4">🔍</p><p className="font-semibold text-white mb-2">No events found</p><p className="text-sm text-gray-500">Try adjusting your search or category filters.</p></div>
          : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{filtered.map(ev => <EventCard key={ev.id} event={ev} />)}</div>}
        <div className="mt-16 glass rounded-2xl p-8 text-center">
          <h2 className="text-xl font-black text-white mb-2">Run an organization?</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">Create a free NEXUS account to manage events, members, and announcements all in one place.</p>
          <Link href="/hub" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-nexus-600 hover:bg-nexus-500 text-white font-semibold text-sm transition-colors">
            Get started free<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
