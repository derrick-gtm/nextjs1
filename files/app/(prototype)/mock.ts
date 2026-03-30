export const MOCK_USER = {
  id:    "usr_01",
  name:  "Jordan Rivera",
  email: "jordan@nexus.app",
};

export const MOCK_ORGS = [
  {
    id: "org_01", slug: "riverside-civic",
    name: "Riverside Civic Alliance",
    description: "Grassroots advocacy for a more equitable Riverside.",
    member_count: 84, event_count: 12, plan: "Pro", health_score: 87,
    role: "Owner", color: "#5b7cff", city: "Riverside", state: "CA", visibility: "public",
  },
  {
    id: "org_02", slug: "eastside-tech",
    name: "Eastside Tech Collective",
    description: "Building a tech-forward community on the Eastside.",
    member_count: 42, event_count: 7, plan: "Free", health_score: 61,
    role: "Admin", color: "#1d9e75", city: "Los Angeles", state: "CA", visibility: "public",
  },
  {
    id: "org_03", slug: "bay-district-vol",
    name: "Bay District Volunteers",
    description: "Serving the Bay District one weekend at a time.",
    member_count: 127, event_count: 19, plan: "Growth", health_score: 93,
    role: "Member", color: "#d85a30", city: "Oakland", state: "CA", visibility: "public",
  },
];

export const ACTIVE_ORG = MOCK_ORGS[0];

export const MOCK_EVENTS = [
  {
    id: "evt_01", title: "Summer Fundraiser Gala",
    description: "Our annual summer fundraiser featuring dinner, live music, and a silent auction. All proceeds support local infrastructure projects and community programs. Dress code: business casual.",
    starts_at: "2025-07-18T18:30:00Z", ends_at: "2025-07-18T22:00:00Z",
    venue_name: "Grand Civic Hall", location: "400 River Rd, Riverside, CA 92501",
    is_virtual: false, virtual_url: null as null,
    org: "Riverside Civic Alliance", org_slug: "riverside-civic", org_color: "#5b7cff",
    rsvp_count: 87, capacity: 120, status: "published", visibility: "public",
    category: "Fundraiser", my_rsvp: "going" as const,
    tags: ["gala", "fundraiser", "annual"],
  },
  {
    id: "evt_02", title: "React Deep Dive Workshop",
    description: "A four-hour workshop covering React 19 concurrent features, server components, and the new `use` hook. Bring your laptop. All skill levels welcome.",
    starts_at: "2025-07-22T10:00:00Z", ends_at: "2025-07-22T14:00:00Z",
    venue_name: null as null, location: null as null, is_virtual: true, virtual_url: "https://zoom.us/j/123456789",
    org: "Eastside Tech Collective", org_slug: "eastside-tech", org_color: "#1d9e75",
    rsvp_count: 31, capacity: 40, status: "published", visibility: "public",
    category: "Workshop", my_rsvp: "maybe" as const,
    tags: ["react", "workshop", "virtual"],
  },
  {
    id: "evt_03", title: "Shoreline Cleanup Drive",
    description: "Join us as we clean up 3 miles of shoreline before the peak summer season. Gloves, bags, and refreshments provided.",
    starts_at: "2025-07-26T08:00:00Z", ends_at: "2025-07-26T12:00:00Z",
    venue_name: "Marina Park Beach", location: "Marina Park, Oakland, CA 94607",
    is_virtual: false, virtual_url: null as null,
    org: "Bay District Volunteers", org_slug: "bay-district-vol", org_color: "#d85a30",
    rsvp_count: 44, capacity: 60, status: "published", visibility: "public",
    category: "Volunteer", my_rsvp: null as null,
    tags: ["volunteer", "environment", "cleanup"],
  },
  {
    id: "evt_04", title: "Q3 Budget Review",
    description: "Internal review of Q3 financials, project allocations, and committee budgets. Attendance required for all committee leads.",
    starts_at: "2025-08-02T14:00:00Z", ends_at: "2025-08-02T16:00:00Z",
    venue_name: "City Hall Room 4B", location: "3900 Main St, Riverside, CA 92522",
    is_virtual: false, virtual_url: null as null,
    org: "Riverside Civic Alliance", org_slug: "riverside-civic", org_color: "#5b7cff",
    rsvp_count: 14, capacity: 20, status: "published", visibility: "private",
    category: "Meeting", my_rsvp: "going" as const,
    tags: ["internal", "finance"],
  },
  {
    id: "evt_05", title: "Open Source Hackathon",
    description: "48-hour hackathon building open source tools for nonprofits and civic organizations. Free to attend. Food and caffeine provided.",
    starts_at: "2025-08-09T09:00:00Z", ends_at: "2025-08-11T09:00:00Z",
    venue_name: "Makerspace Hub", location: "800 Industrial Blvd, Los Angeles, CA 90021",
    is_virtual: false, virtual_url: null as null,
    org: "Eastside Tech Collective", org_slug: "eastside-tech", org_color: "#1d9e75",
    rsvp_count: 52, capacity: 80, status: "published", visibility: "public",
    category: "Hackathon", my_rsvp: null as null,
    tags: ["hackathon", "open-source", "tech"],
  },
  {
    id: "evt_06", title: "Community Garden Launch",
    description: "Grand opening of the Eastside Community Garden. Free seedlings, hands-on planting workshops, and live music from local artists.",
    starts_at: "2025-08-15T11:00:00Z", ends_at: "2025-08-15T15:00:00Z",
    venue_name: "Eastside Commons", location: "1200 Cesar Chavez Ave, Los Angeles, CA 90033",
    is_virtual: false, virtual_url: null as null,
    org: "Bay District Volunteers", org_slug: "bay-district-vol", org_color: "#d85a30",
    rsvp_count: 73, capacity: null as null, status: "published", visibility: "public",
    category: "Community", my_rsvp: "going" as const,
    tags: ["community", "garden", "environment"],
  },
  {
    id: "evt_07", title: "Civic Tech Conference 2025",
    description: "Annual gathering of civic technologists, government innovators, and community leaders. Two days of talks, panels, and workshops.",
    starts_at: "2025-08-20T09:00:00Z", ends_at: "2025-08-21T17:00:00Z",
    venue_name: "Convention Center", location: "700 W Convention Way, Anaheim, CA 92802",
    is_virtual: false, virtual_url: null as null,
    org: "Eastside Tech Collective", org_slug: "eastside-tech", org_color: "#1d9e75",
    rsvp_count: 211, capacity: 300, status: "published", visibility: "public",
    category: "Conference", my_rsvp: null as null,
    tags: ["conference", "civic-tech", "annual"],
  },
];

export const MOCK_MEMBERS = [
  { id: "mem_01", name: "Aaliyah Chen",  email: "a.chen@civic.org",   role: "Owner",     status: "active",  joined: "2023-01-15", hours: 142, title: "Executive Director"    },
  { id: "mem_02", name: "Marcus Webb",   email: "m.webb@civic.org",   role: "Admin",     status: "active",  joined: "2023-03-08", hours: 98,  title: "Operations Lead"       },
  { id: "mem_03", name: "Sofia Patel",   email: "sofia@civic.org",    role: "Moderator", status: "active",  joined: "2023-06-20", hours: 76,  title: "Community Manager"     },
  { id: "mem_04", name: "Ethan Okafor",  email: "ethan.o@civic.org",  role: "Member",    status: "active",  joined: "2024-01-10", hours: 54,  title: "Volunteer Coordinator" },
  { id: "mem_05", name: "Priya Nair",    email: "p.nair@civic.org",   role: "Member",    status: "active",  joined: "2024-02-28", hours: 41,  title: "Events Committee"      },
  { id: "mem_06", name: "Diego Vargas",  email: "d.vargas@civic.org", role: "Member",    status: "active",  joined: "2024-04-15", hours: 29,  title: "Communications Lead"   },
  { id: "mem_07", name: "Chloe Fischer", email: "c.fi@civic.org",     role: "Member",    status: "pending", joined: "2025-06-01", hours: 0,   title: "New Member"            },
  { id: "mem_08", name: "Jordan Rivera", email: "jordan@nexus.app",   role: "Admin",     status: "active",  joined: "2023-01-15", hours: 87,  title: "Strategic Advisor"     },
  { id: "mem_09", name: "Laila Hassan",  email: "l.hassan@civic.org", role: "Member",    status: "active",  joined: "2024-05-22", hours: 63,  title: "Policy Research"       },
  { id: "mem_10", name: "Tomas Reyes",   email: "t.reyes@civic.org",  role: "Member",    status: "active",  joined: "2024-07-11", hours: 34,  title: "Outreach Coordinator"  },
];

export const MOCK_ANNOUNCEMENTS = [
  {
    id: "ann_01", title: "Summer Gala — Volunteer Sign-ups Now Open",
    body: "We need 20 volunteers for setup, check-in, and breakdown. All volunteers receive complimentary dinner tickets. Sign up by July 10th.",
    author: "Aaliyah Chen", created_at: new Date(Date.now() - 2 * 3_600_000).toISOString(),
    pinned: true, audience: "all", org: "Riverside Civic Alliance", org_color: "#5b7cff",
  },
  {
    id: "ann_02", title: "Q2 Impact Report Now Published",
    body: "Our Q2 Impact Report is live. Key highlights: 1,240 community members reached, 847 volunteer hours logged, and three ordinances successfully advanced.",
    author: "Marcus Webb", created_at: new Date(Date.now() - 26 * 3_600_000).toISOString(),
    pinned: false, audience: "all", org: "Riverside Civic Alliance", org_color: "#5b7cff",
  },
  {
    id: "ann_03", title: "Board Meeting Recap — June 2025",
    body: "Key decisions: approved $18,000 for the Magnolia Park renovation, deferred the website redesign to Q4, and elected two new committee chairs.",
    author: "Aaliyah Chen", created_at: new Date(Date.now() - 3 * 86_400_000).toISOString(),
    pinned: false, audience: "admin", org: "Riverside Civic Alliance", org_color: "#5b7cff",
  },
  {
    id: "ann_04", title: "New React 19 Learning Resources",
    body: "We compiled a curated list of resources for the upcoming React 19 migration. Check the #resources channel in Discuss for links and the migration guide.",
    author: "Diego Vargas", created_at: new Date(Date.now() - 5 * 86_400_000).toISOString(),
    pinned: false, audience: "all", org: "Eastside Tech Collective", org_color: "#1d9e75",
  },
];

export const VOLUNTEER_OPPS = [
  { id: "vol_01", title: "Event Setup Crew",        date: "Jul 18", hours: 4, spots: 8,  filled: 6 },
  { id: "vol_02", title: "Check-in Volunteers",     date: "Jul 18", hours: 3, spots: 5,  filled: 5 },
  { id: "vol_03", title: "Park Bench Restoration",  date: "Aug 3",  hours: 6, spots: 12, filled: 4 },
  { id: "vol_04", title: "Quarterly Report Assist", date: "Aug 10", hours: 2, spots: 3,  filled: 1 },
];
