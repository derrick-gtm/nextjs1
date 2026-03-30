"use client";

import { useState } from "react";
import { Plus, Search, Grid, List, Mail, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, Badge, Button, MemberCard } from "../ui";
import { MOCK_MEMBERS, ACTIVE_ORG } from "../mock";

type ViewMode = "list" | "grid";

const ROLE_VARIANT: Record<string, "info" | "warning" | "role" | "default"> = {
  Owner: "info", Admin: "warning", Moderator: "role", Member: "default",
};

export default function MembersPage() {
  const [search,     setSearch]     = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [view,       setView]       = useState<ViewMode>("list");
  const roles = ["All", "Owner", "Admin", "Moderator", "Member"];

  const filtered = MOCK_MEMBERS.filter(m =>
    (roleFilter === "All" || m.role === roleFilter) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) ||
     m.email.toLowerCase().includes(search.toLowerCase()) ||
     m.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Member Directory</h1>
          <p className="text-sm text-gray-400 mt-1">{ACTIVE_ORG.name} · {MOCK_MEMBERS.length} members</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="h-3.5 w-3.5" />Invite member</Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members…"
            className="w-full h-9 pl-9 pr-3 rounded-xl text-sm bg-surface-overlay border border-surface-border text-white placeholder:text-gray-600 outline-none focus:border-nexus-700 transition-colors" />
        </div>
        <div className="flex gap-1">
          {roles.map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                roleFilter === r ? "bg-nexus-600/20 text-nexus-300 border border-nexus-600/30" : "text-gray-500 hover:text-gray-300 border border-transparent hover:border-surface-border")}>
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-1 ml-auto">
          {(["list", "grid"] as ViewMode[]).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={cn("p-1.5 rounded-lg transition-colors",
                view === v ? "bg-nexus-600/20 text-nexus-400" : "text-gray-500 hover:text-gray-300 hover:bg-surface-overlay")}>
              {v === "list" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600">{filtered.length} of {MOCK_MEMBERS.length} members</p>

      {view === "list" && (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border">
                {["Member", "Role", "Status", "Joined", "Hours", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-surface-overlay transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={m.name} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-white">{m.name}</p>
                        <p className="text-[11px] text-gray-500">{m.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><Badge variant={ROLE_VARIANT[m.role] ?? "default"}>{m.role}</Badge></td>
                  <td className="px-5 py-3.5"><Badge variant={m.status === "active" ? "success" : "warning"}>{m.status === "active" ? "Active" : "Pending"}</Badge></td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{new Date(m.joined).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-white">{m.hours}h</td>
                  <td className="px-5 py-3.5">
                    <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface-overlay text-gray-500 hover:text-nexus-400">
                      <Mail className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-sm text-gray-500 text-center py-12">No members match your filters.</p>}
        </div>
      )}

      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(m => (
            <div key={m.id} className="glass rounded-2xl p-5 space-y-4 hover:border-nexus-800/60 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={m.name} size="lg" />
                  <div>
                    <p className="font-semibold text-white text-sm">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.title}</p>
                  </div>
                </div>
                <Badge variant={ROLE_VARIANT[m.role] ?? "default"}>{m.role}</Badge>
              </div>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2"><Mail className="h-3 w-3 text-gray-600 shrink-0" /><span className="truncate">{m.email}</span></div>
                <div className="flex items-center gap-2"><Clock className="h-3 w-3 text-gray-600 shrink-0" /><span>{m.hours}h logged this year</span></div>
              </div>
              <div className="pt-3 border-t border-surface-border flex items-center justify-between">
                <Badge variant={m.status === "active" ? "success" : "warning"}>{m.status === "active" ? "Active" : "Pending"}</Badge>
                <span className="text-[11px] text-gray-600">Since {new Date(m.joined).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-sm text-gray-500 text-center py-12 col-span-full">No members match your filters.</p>}
        </div>
      )}
    </div>
  );
}
