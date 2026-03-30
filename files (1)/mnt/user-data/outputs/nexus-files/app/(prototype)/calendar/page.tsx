"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, EventRow, CategoryPill } from "../ui";
import { MOCK_EVENTS, MOCK_ORGS } from "../mock";

type CalView = "month" | "week" | "list";
const MONTHS    = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function eventsForDate(events: typeof MOCK_EVENTS, date: Date) {
  return events.filter(e => {
    const d = new Date(e.starts_at);
    return d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate();
  });
}

function MonthView({ date, events }: { date: Date; events: typeof MOCK_EVENTS }) {
  const today = new Date();
  const y = date.getFullYear(), m = date.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();

  const cells: { day: number; current: boolean; date: Date }[] = [];
  for (let i = 0; i < firstDay; i++)
    cells.push({ day: prevDays - firstDay + 1 + i, current: false, date: new Date(y, m - 1, prevDays - firstDay + 1 + i) });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, current: true, date: new Date(y, m, d) });
  for (let d = 1; cells.length < 42; d++)
    cells.push({ day: d, current: false, date: new Date(y, m + 1, d) });

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="grid grid-cols-7 border-b border-surface-border">
        {DAYS_SHORT.map(d => <div key={d} className="text-center py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{d}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          const isToday = cell.current && cell.date.toDateString() === today.toDateString();
          const dayEvts = cell.current ? eventsForDate(events, cell.date) : [];
          return (
            <div key={i}
              className={cn("min-h-[80px] p-1.5 transition-colors",
                i % 7 !== 6 && "border-r border-surface-border",
                Math.floor(i / 7) < 5 && "border-b border-surface-border",
                cell.current ? "hover:bg-surface-overlay cursor-pointer" : "opacity-40")}>
              {cell.current && (
                <>
                  <div className={cn("h-6 w-6 rounded-full flex items-center justify-center text-xs mb-1 font-medium",
                    isToday ? "bg-nexus-600 text-white font-black" : "text-gray-400")}>
                    {cell.day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvts.slice(0, 2).map(ev => (
                      <div key={ev.id} className="px-1.5 py-0.5 rounded text-[10px] font-semibold truncate"
                        style={{ background: ev.org_color + "33", color: ev.org_color }}>
                        {ev.title}
                      </div>
                    ))}
                    {dayEvts.length > 2 && <p className="text-[10px] text-gray-500 px-1">+{dayEvts.length - 2} more</p>}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView({ date, events }: { date: Date; events: typeof MOCK_EVENTS }) {
  const today  = new Date();
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - date.getDay());
  const days   = Array.from({ length: 7 }, (_, i) => { const d = new Date(sunday); d.setDate(sunday.getDate() + i); return d; });

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="grid grid-cols-7 border-b border-surface-border">
        {days.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          return (
            <div key={i} className={cn("text-center py-3", i < 6 && "border-r border-surface-border")}>
              <p className="text-[11px] font-semibold text-gray-500 uppercase">{DAYS_SHORT[i]}</p>
              <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-sm font-black mx-auto mt-1",
                isToday ? "bg-nexus-600 text-white" : "text-white")}>
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 min-h-[320px]">
        {days.map((d, i) => {
          const dayEvts = eventsForDate(events, d);
          return (
            <div key={i} className={cn("p-2 transition-colors hover:bg-surface-overlay", i < 6 && "border-r border-surface-border")}>
              <div className="space-y-1.5">
                {dayEvts.map(ev => (
                  <div key={ev.id} className="px-2 py-1.5 rounded-lg cursor-pointer hover:opacity-90 transition-all"
                    style={{ background: ev.org_color + "33", borderLeft: `2px solid ${ev.org_color}` }}>
                    <p className="text-[10px] font-semibold truncate" style={{ color: ev.org_color }}>{ev.title}</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">
                      {new Date(ev.starts_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [view,      setView]      = useState<CalView>("month");
  const [orgFilter, setOrgFilter] = useState("all");
  const [date,      setDate]      = useState(() => {
    const first = new Date(MOCK_EVENTS[0].starts_at);
    return new Date(first.getFullYear(), first.getMonth(), 1);
  });

  const filteredEvents = orgFilter === "all" ? MOCK_EVENTS : MOCK_EVENTS.filter(e => e.org_slug === orgFilter);

  function prev() { setDate(d => { const n = new Date(d); view === "month" ? n.setMonth(n.getMonth() - 1) : n.setDate(n.getDate() - 7); return n; }); }
  function next() { setDate(d => { const n = new Date(d); view === "month" ? n.setMonth(n.getMonth() + 1) : n.setDate(n.getDate() + 7); return n; }); }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Calendar</h1>
          <p className="text-sm text-gray-400 mt-1">{MOCK_EVENTS.length} upcoming events</p>
        </div>
        <div className="flex gap-1 bg-surface-overlay rounded-xl p-1 border border-surface-border">
          {(["month","week","list"] as CalView[]).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize",
                view === v ? "bg-nexus-600 text-white" : "text-gray-400 hover:text-white")}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setOrgFilter("all")}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
              orgFilter === "all" ? "bg-white/10 text-white border-white/20" : "text-gray-500 border-transparent hover:text-gray-300")}>
            All orgs
          </button>
          {MOCK_ORGS.map(org => (
            <button key={org.id} onClick={() => setOrgFilter(org.slug)}
              className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                orgFilter === org.slug ? "text-white border-white/20" : "text-gray-500 border-transparent hover:text-gray-300")}
              style={orgFilter === org.slug ? { background: org.color + "33", borderColor: org.color + "55" } : {}}>
              <span className="h-2 w-2 rounded-full" style={{ background: org.color }} />
              {org.name.split(" ")[0]}
            </button>
          ))}
        </div>
        {view !== "list" && (
          <div className="flex items-center gap-2">
            <button onClick={prev} className="p-2 rounded-xl hover:bg-surface-overlay text-gray-400 hover:text-white transition-colors"><ChevronLeft className="h-4 w-4" /></button>
            <p className="text-sm font-semibold text-white w-36 text-center">{MONTHS[date.getMonth()]} {date.getFullYear()}</p>
            <button onClick={next} className="p-2 rounded-xl hover:bg-surface-overlay text-gray-400 hover:text-white transition-colors"><ChevronRight className="h-4 w-4" /></button>
          </div>
        )}
      </div>

      {view === "month" && <MonthView date={date} events={filteredEvents} />}
      {view === "week"  && <WeekView  date={date} events={filteredEvents} />}
      {view === "list"  && (
        <div className="space-y-3">
          <p className="text-xs text-gray-600">{filteredEvents.length} events</p>
          {filteredEvents.map(ev => <EventRow key={ev.id} event={ev} showOrg linkTo="/events" />)}
        </div>
      )}
    </div>
  );
}
