// src/data/adminMockData.js

// Pending approvals (mixed alumni + students)
export const pendingApprovals = [
  { id: 1,  name: "Karan Mani Tripathi",  role: "Alumni",  joinDate: "2025-09-24", details: "B.Tech CSE, 2018" },
  { id: 2,  name: "Rahul Verma",   role: "Student", joinDate: "2025-09-24", details: "Student ID: 19BCE1234" },
  { id: 3,  name: "Ankit Gupta",   role: "Alumni",  joinDate: "2025-09-24", details: "MBA, 2015" },
  { id: 4,  name: "Neha Patel",    role: "Alumni",  joinDate: "2025-09-24", details: "B.Tech ECE, 2016 • Amazon" },
  { id: 5,  name: "Ishaan Mehta",  role: "Student", joinDate: "2025-09-24", details: "Student ID: 21BCE0456" },
  { id: 6,  name: "Ananya Rao",    role: "Alumni",  joinDate: "2025-09-24", details: "M.Tech AI, 2020 • TCS" },
  { id: 7,  name: "Kartik Singh",  role: "Student", joinDate: "2025-09-24", details: "Student ID: 22BME0321" },
  { id: 8,  name: "Zara Khan",     role: "Alumni",  joinDate: "2025-09-24", details: "B.Sc IT, 2017 • Infosys" },
];

// Events (unique ids, varied status, venue, and attendees)
export const recentEvents = [
  { id: 1,  name: "Annual Alumni Meet 2025",      date: "2025-11-15", attendees: 250, status: "Upcoming",  venue: "Main Auditorium" },
  { id: 2,  name: "Startup Networking Night",     date: "2025-10-10", attendees: 120, status: "Upcoming",  venue: "Innovation Hub" },
  { id: 3,  name: "Mentorship Kickoff Session",   date: "2025-09-28", attendees: 180, status: "Upcoming",  venue: "Seminar Hall 2" },
  { id: 4,  name: "Tech Talks: AI & ML Trends",    date: "2025-08-20", attendees: 200, status: "Completed", venue: "Virtual" },
  { id: 5,  name: "Product Design Showcase",      date: "2025-07-05", attendees: 95,  status: "Completed", venue: "Design Studio" },
  { id: 6,  name: "Career Fair with Alumni",      date: "2025-12-05", attendees: 300, status: "Upcoming",  venue: "Sports Complex" },
  { id: 7,  name: "Fundraising Gala Dinner",      date: "2025-12-20", attendees: 180, status: "Upcoming",  venue: "City Convention Center" },
];

// Dashboard counters computed from arrays
export const dashboardStats = {
  totalAlumni: 12540,
  totalStudents: 8650,
  pendingApprovals: pendingApprovals.length,
  activeEvents: recentEvents.filter(e => e.status === "Upcoming").length,
};
