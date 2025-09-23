import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle, XCircle, Search, Filter, RefreshCw,
  User, GraduationCap, CalendarDays, ChevronLeft, ChevronRight, Building2,
  Mail, Hash, Linkedin, Award
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

// Generate sample approval data
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const firstNames = ["Aarav","Vivaan","Aditya","Vihaan","Arjun","Reyansh","Ishaan","Ayaan","Riya","Ananya","Diya","Aisha","Sara","Aarohi","Navya","Zoya","Mahika","Myra","Advika","Khushi"];
const lastNames  = ["Sharma","Verma","Mehta","Patel","Gupta","Bansal","Iyer","Menon","Chakraborty","Das","Khan","Singh","Kapoor","Bedi","Agarwal","Saxena"];
const degrees    = ["B.Tech CSE","B.Tech ECE","B.Tech ME","B.Tech CE","MBA","MCA","B.Sc IT","M.Tech AI"];
const companies  = ["Google","Microsoft","Amazon","Apple","TCS","Infosys","Wipro","Flipkart","Paytm","Zoho"];
const colleges   = ["JUET Guna","IIT Delhi","IIT Bombay","IIIT Hyderabad","VIT","BITS Pilani"];
const roles      = ["student","alumni"];
const statuses   = ["Pending","Approved","Rejected"];

function makeRecord(id) {
  const role = rand(roles);
  const first = rand(firstNames);
  const last = rand(lastNames);
  const name = `${first} ${last}`;
  const email = `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(Math.random()*100)}@mail.com`;
  const joinDate = new Date(Date.now() - Math.random()*1000*60*60*24*30).toISOString().slice(0,10);
  const status = rand(statuses);
  const collegeId = rand(colleges);

  if (role === "alumni") {
    const degree = rand(degrees);
    const batch = rand([2015,2016,2017,2018,2019,2020,2021,2022,2023,2024]);
    const company = rand(companies);
    return { 
      id, role, name, email, joinDate, status, degree, batch, collegeId, 
      details: `${degree}, ${batch} • ${company}`,
      linkedin: `https://linkedin.com/in/${first.toLowerCase()}${last.toLowerCase()}`
    };
  }
  
  const studentId = `${rand(["19","20","21","22","23","24"])}BCE${1000+Math.floor(Math.random()*9000)}`;
  const major = rand(["CSE","ECE","ME","CE","IT"]);
  const batch = rand([2024,2025,2026,2027,2028]);
  return { 
    id, role, name, email, joinDate, status, studentId, batch, collegeId, 
    details: `ID: ${studentId} • ${major} • Batch ${batch}`
  };
}

function makeDataset(count = 50) {
  return Array.from({length: count}, (_, i) => makeRecord(i + 1));
}

function useDebounced(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function AdminApprovals() {
  const [all, setAll] = useState([]);
  const [q, setQ] = useState("");
  const dq = useDebounced(q, 250);
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("Pending");
  const [collegeId, setCollegeId] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    const seeded = makeDataset(100);
    // Add some priority pending requests at the top
    seeded.unshift(
      { id: 90001, role: "alumni", name: "Priya Sharma", email: "priya.sharma@example.com", joinDate: "2025-09-10", status: "Pending", degree: "B.Tech CSE", batch: 2018, collegeId: "JUET Guna", details: "B.Tech CSE, 2018 • Microsoft", linkedin: "https://linkedin.com/in/priyasharma" },
      { id: 90002, role: "student", name: "Rahul Verma", email: "rahul.verma@example.com", joinDate: "2025-09-10", status: "Pending", studentId: "21BCE1234", batch: 2025, collegeId: "JUET Guna", details: "ID: 21BCE1234 • CSE • Batch 2025" },
      { id: 90003, role: "alumni", name: "Ankit Gupta", email: "ankit.gupta@example.com", joinDate: "2025-09-09", status: "Pending", degree: "MBA", batch: 2015, collegeId: "JUET Guna", details: "MBA, 2015 • Goldman Sachs", linkedin: "https://linkedin.com/in/ankitgupta" },
    );
    setAll(seeded);
  }, []);

  const onApprove = (id) => {
    setAll(prev => prev.map(r => r.id === id ? { ...r, status: "Approved" } : r));
  };

  const onReject = (id) => {
    setAll(prev => prev.map(r => r.id === id ? { ...r, status: "Rejected" } : r));
  };

  const filtered = useMemo(() => {
    let rows = all;
    if (role !== "all") rows = rows.filter(r => r.role === role);
    if (status !== "all") rows = rows.filter(r => r.status === status);
    if (collegeId !== "all") rows = rows.filter(r => r.collegeId === collegeId);
    if (dateFrom) rows = rows.filter(r => r.joinDate >= dateFrom);
    if (dateTo) rows = rows.filter(r => r.joinDate <= dateTo);
    if (dq.trim()) {
      const k = dq.trim().toLowerCase();
      rows = rows.filter(r =>
        (r.name || "").toLowerCase().includes(k) ||
        (r.email || "").toLowerCase().includes(k) ||
        (r.details || "").toLowerCase().includes(k)
      );
    }
    // Sort by status (Pending first) then by date
    const rank = (s) => s === "Pending" ? 0 : s === "Approved" ? 1 : 2;
    rows = [...rows].sort((a, b) => rank(a.status) - rank(b.status) || b.joinDate.localeCompare(a.joinDate));
    return rows;
  }, [all, role, status, collegeId, dateFrom, dateTo, dq]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  useEffect(() => { setPage(1); }, [role, status, collegeId, dateFrom, dateTo, dq, pageSize]);

  const pendingCount = all.filter(r => r.status === "Pending").length;
  const approvedCount = all.filter(r => r.status === "Approved").length;
  const rejectedCount = all.filter(r => r.status === "Rejected").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">Alumni & Student Approvals</h1>
          <p className="text-slate-600">Review, approve, and manage registration requests from alumni and students.</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
          onClick={() => { setQ(""); setRole("all"); setStatus("Pending"); setCollegeId("all"); setDateFrom(""); setDateTo(""); setPage(1); }}
        >
          <RefreshCw className="h-4 w-4" /> Reset Filters
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
            >
              <User className="w-6 h-6" style={{ color: `rgb(${brand.coral})` }} />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Approved</p>
              <p className="text-2xl font-bold text-slate-900">{approvedCount}</p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
            >
              <CheckCircle className="w-6 h-6" style={{ color: `rgb(${brand.indigo})` }} />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Rejected</p>
              <p className="text-2xl font-bold text-slate-900">{rejectedCount}</p>
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `rgba(${brand.lilac}, 0.1)` }}
            >
              <XCircle className="w-6 h-6" style={{ color: `rgb(${brand.lilac})` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-4">
        <div className="md:col-span-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, email, details..."
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-slate-400"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
            <select
              value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-8 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
            <select
              value={status} onChange={(e) => setStatus(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-8 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
            <select
              value={collegeId} onChange={(e) => setCollegeId(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-8 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
            >
              <option value="all">All Colleges</option>
              {colleges.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
            <input
              type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Results meta */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <div>{total.toLocaleString()} results found</div>
        <div className="flex items-center gap-2">
          <span>Show:</span>
          <select
            value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-white border border-slate-300 rounded-md px-2 py-1 text-slate-900"
          >
            {[10, 25, 50, 100].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span>per page</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-700 text-sm">
              <tr>
                <th className="p-4 font-medium">Applicant</th>
                <th className="p-4 font-medium hidden lg:table-cell">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium hidden md:table-cell">College</th>
                <th className="p-4 font-medium hidden md:table-cell">Applied</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {paged.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={r.name} />
                      <div>
                        <p className="font-medium text-slate-900">{r.name}</p>
                        <p className="text-slate-500 text-xs">{r.details}</p>
                        {r.linkedin && (
                          <a href={r.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1">
                            <Linkedin className="w-3 h-3" />
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-slate-600">{r.email}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      r.role === 'alumni'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {r.role === "alumni" ? "Alumni" : "Student"}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell text-slate-600">{r.collegeId}</td>
                  <td className="p-4 hidden md:table-cell text-slate-600">{r.joinDate}</td>
                  <td className="p-4">
                    <span className={`text-xs rounded-full px-3 py-1 font-medium ${
                      r.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      r.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={r.status !== "Pending"}
                        onClick={() => onApprove(r.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-green-100 px-3 py-2 text-green-800 hover:bg-green-200 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </button>
                      <button
                        disabled={r.status !== "Pending"}
                        onClick={() => onReject(r.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-red-800 hover:bg-red-200 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-slate-500" colSpan={7}>
                    No applications match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 text-sm text-slate-600 bg-slate-50">
          <div>Showing page {safePage} of {totalPages}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 transition disabled:opacity-50"
              disabled={safePage <= 1}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 transition disabled:opacity-50"
              disabled={safePage >= totalPages}
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name }) {
  const initials = (name || "?").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div 
      className="flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold text-sm"
      style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
    >
      {initials}
    </div>
  );
}
