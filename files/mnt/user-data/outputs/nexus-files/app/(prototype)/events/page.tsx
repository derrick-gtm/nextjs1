"use client";

import { useState } from "react";
import {
  Plus, Search, MapPin, Monitor, Users, Clock,
  ArrowLeft, Calendar, ExternalLink, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, Badge, Button, CategoryPill, RsvpButton, CapacityBar, DateBlock } from "../ui";
import { MOCK_EVENTS } from "../mock";

const CATEGORIES = ["All", "Fundraiser", "Workshop", "Volunteer", "Meeting", "Hackathon", "Community", "Conference"];

function EventList({ onSelect }: { onSelect: (id: string) => void }) {
  const [search, setSearch] = useState("");
  const [cat,    setCat]    = useState("All");

  const filtered = MOCK_EVENTS.filter(e =>
    (cat === "All" || e.category === cat) &&
    (e.title.toLowerCase().includes(search.toLowerCase()) || e.org.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Events</h1>
          <p className="text-sm text-gray-400 mt-1">All upcoming events across your organizations</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="h-3.5 w-3.5" />Create event</Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events…"
            className="w-full h-9 pl-9 pr-3 rounded-xl text-sm bg-surface-overlay border border-surface-border text-white placeholder:text-gray-600 outline-none focus:border-nexus-700 transition-colors" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                cat === c ? "bg-nexus-600/20 text-nexus-300 border border-nexus-600/30" : "text-gray-500 hover:text-gray-300 border border-transparent")}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600">{filtered.length} events</p>

      <div className="space-y-2">
        {filtered.map(ev => (
          <button key={ev.id} onClick={() => onSelect(ev.id)} className="w-full text-left">
            <div className="glass rounded-2xl flex items-center gap-4 px-5 py-4 transition-all duration-200 hover:border-nexus-800/60 hover:bg-surface-overlay group">
              <DateBlock dateStr={ev.starts_at} accentColor={ev.org_color} />
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-semibold text-sm text-white group-hover:text-nexus-200 transition-colors">{ev.title}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(ev.starts_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
                  {(ev.venue_name ?? ev.location) && !ev.is_virtual && (
                    <span className="flex items-center gap-1 truncate max-w-[180px]"><MapPin className="h-3 w-3 shrink-0" />{ev.venue_name ?? ev.location}</span>
                  )}
                  {ev.is_virtual && <span className="flex items-center gap-1"><Monitor className="h-3 w-3" />Virtual</span>}
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{ev.rsvp_count}{ev.capacity ? `/${ev.capacity}` : ""} going</span>
                  <span className="font-medium hidden sm:block" style={{ color: ev.org_color }}>{ev.org}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <CategoryPill category={ev.category} />
                {ev.my_rsvp === "going"      && <Badge variant="success">Going</Badge>}
                {ev.my_rsvp === "maybe"      && <Badge variant="warning">Maybe</Badge>}
                {ev.visibility === "private" && <Badge variant="default">Private</Badge>}
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && <div className="glass rounded-2xl p-12 text-center"><p className="text-gray-500 text-sm">No events match your filters.</p></div>}
      </div>
    </div>
  );
}

function EventDetail({ eventId, onBack }: { eventId: string; onBack: () => void }) {
  const ev = MOCK_EVENTS.find(e => e.id === eventId);
  if (!ev) return null;

  const start   = new Date(ev.starts_at);
  const end     = ev.ends_at ? new Date(ev.ends_at) : null;
  const dateStr = start.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const timeStr = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const endStr  = end?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const locStr  = ev.is_virtual ? "Virtual event" : (ev.venue_name ?? ev.location ?? "TBD");

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" />Back to events
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="h-32 flex items-end p-5" style={{ background: `linear-gradient(135deg, ${ev.org_color}33, ${ev.org_color}11)` }}>
              <div className="flex items-center gap-2">
                <CategoryPill category={ev.category} />
                {ev.is_virtual && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border text-teal-300 bg-teal-500/10 border-teal-500/20"><Monitor className="h-3 w-3" />Virtual</span>}
                {ev.visibility === "public" && <Badge variant="success">Public</Badge>}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">{ev.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-black text-white" style={{ background: ev.org_color }}>{ev.org[0]}</div>
                  <span className="text-sm font-medium" style={{ color: ev.org_color }}>{ev.org}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{ev.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Calendar,                  label: "Date",     val: dateStr },
                  { icon: Clock,                     label: "Time",     val: endStr ? `${timeStr} – ${endStr}` : timeStr },
                  { icon: ev.is_virtual ? Monitor : MapPin, label: ev.is_virtual ? "Format" : "Location", val: locStr },
                  { icon: Users,                     label: "Capacity", val: ev.capacity ? `${ev.rsvp_count} / ${ev.capacity} going` : `${ev.rsvp_count} going` },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="glass rounded-xl px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1"><Icon className="h-3 w-3 text-gray-500" /><p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{label}</p></div>
                    <p className="text-sm text-white font-medium">{val}</p>
                  </div>
                ))}
              </div>
              {ev.capacity && <CapacityBar current={ev.rsvp_count} max={ev.capacity} />}
              {ev.tags && ev.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-3.5 w-3.5 text-gray-600" />
                  {ev.tags.map(t => <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-overlay border border-surface-border text-gray-400">{t}</span>)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-5 space-y-4">
            <p className="text-sm font-semibold text-white">Your RSVP</p>
            <RsvpButton initial={ev.my_rsvp} />
          </div>
          <div className="glass rounded-2xl p-5 space-y-3">
            <p className="text-sm font-semibold text-white">Add to calendar</p>
            {["Google Calendar", "Apple Calendar (.ics)", "Outlook"].map(cal => (
              <button key={cal} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-surface-overlay border border-surface-border text-sm text-gray-300 hover:text-white hover:border-nexus-700/40 transition-all">
                {cal}<ExternalLink className="h-3.5 w-3.5 text-gray-600" />
              </button>
            ))}
          </div>
          <div className="glass rounded-2xl p-5 space-y-3">
            <p className="text-sm font-semibold text-white">Who&apos;s going</p>
            <div className="flex -space-x-2">
              {["Aaliyah Chen", "Marcus Webb", "Sofia Patel", "Ethan Okafor", "Priya Nair"].map(name => (
                <Avatar key={name} name={name} size="sm" className="ring-2 ring-surface-raised" />
              ))}
              {ev.rsvp_count > 5 && (
                <div className="h-8 w-8 rounded-full bg-surface-overlay border border-surface-border flex items-center justify-center text-[10px] text-gray-400 font-semibold ring-2 ring-surface-raised">
                  +{ev.rsvp_count - 5}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">{ev.rsvp_count} people are going</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return selectedId
    ? <EventDetail eventId={selectedId} onBack={() => setSelectedId(null)} />
    : <EventList onSelect={setSelectedId} />;
}
