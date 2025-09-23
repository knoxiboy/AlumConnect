import { useEffect, useMemo, useState } from "react";
import { recentEvents as seedEvents } from "../../data/adminMockData";
import {
  CalendarDays, Plus, Edit3, Trash2, X, Search, Filter,
  ChevronLeft, ChevronRight, Check, Users, Target
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

// Modal shell - Mobile Responsive
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-lg border border-slate-200 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

const STATUS_OPTIONS = ["Upcoming", "Completed"];

export default function AdminEvents() {
  // data
  const [events, setEvents] = useState([]);

  // filters & paging
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // modals
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState(null);

  // forms
  const [form, setForm] = useState({ name: "", date: "", status: "Upcoming", venue: "", description: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // seed from mock, enhance with venue/description fields if missing
    setEvents(
      seedEvents.map(e => ({
        ...e,
        venue: e.venue ?? "Main Auditorium",
        description: e.description ?? "Alumni engagement event to strengthen institutional relationships and provide networking opportunities.",
      }))
    );
  }, []);

  // validation
  const validate = (data) => {
    const e = {};
    if (!data.name.trim()) e.name = "Event name is required";
    if (!data.date) e.date = "Date is required";
    if (!STATUS_OPTIONS.includes(data.status)) e.status = "Invalid status";
    return e;
  };

  // add event
  const openAddModal = () => {
    setForm({ name: "", date: "", status: "Upcoming", venue: "", description: "" });
    setErrors({});
    setOpenAdd(true);
  };

  const addEvent = () => {
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;

    const newEvent = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      date: form.date,
      status: form.status,
      venue: form.venue.trim(),
      description: form.description.trim(),
      attendees: 0,
    };
    setEvents(prev => [newEvent, ...prev]);
    setOpenAdd(false);
  };

  // edit event
  const openEditModal = (ev) => {
    setEditing(ev);
    setForm({
      name: ev.name,
      date: ev.date,
      status: ev.status,
      venue: ev.venue || "",
      description: ev.description || "",
    });
    setErrors({});
    setOpenEdit(true);
  };

  const saveEdit = () => {
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;

    setEvents(prev => prev.map(ev =>
      ev.id === editing.id ? {
        ...ev,
        name: form.name.trim(),
        date: form.date,
        status: form.status,
        venue: form.venue.trim(),
        description: form.description.trim(),
      } : ev
    ));
    setOpenEdit(false);
    setEditing(null);
  };

  // actions
  const toggleStatus = (id) => {
    setEvents(prev => prev.map(ev =>
      ev.id === id ? { ...ev, status: ev.status === "Upcoming" ? "Completed" : "Upcoming" } : ev
    ));
  };

  const removeEvent = (id) => {
    if (!confirm("Delete this event?")) return;
    setEvents(prev => prev.filter(ev => ev.id !== id));
  };

  // filtering
  const filtered = useMemo(() => {
    let rows = events;
    if (status !== "all") rows = rows.filter(e => e.status === status);
    if (dateFrom) rows = rows.filter(e => e.date >= dateFrom);
    if (dateTo) rows = rows.filter(e => e.date <= dateTo);
    if (q.trim()) {
      const k = q.trim().toLowerCase();
      rows = rows.filter(e =>
        e.name.toLowerCase().includes(k) ||
        (e.venue || "").toLowerCase().includes(k) ||
        (e.description || "").toLowerCase().includes(k)
      );
    }
    // sort by date asc
    rows = [...rows].sort((a,b) => a.date.localeCompare(b.date));
    return rows;
  }, [events, q, status, dateFrom, dateTo]);

  // pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  useEffect(() => { setPage(1); }, [q, status, dateFrom, dateTo, pageSize]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header - Mobile Responsive */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Alumni Event Management</h1>
          <p className="text-slate-600 text-sm sm:text-base">Create and manage events to strengthen alumni engagement and institutional relationships.</p>
        </div>
        <button 
          onClick={openAddModal} 
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm sm:text-base"
          style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
        >
          <Plus className="h-4 w-4" />
          Add New Event
        </button>
      </div>

      {/* Statistics Cards - Mobile Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium text-slate-600">Total Events</p>
              <p className="text-lg sm:text-2xl font-bold text-slate-900">{events.length}</p>
            </div>
            <div 
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-2 sm:mt-0"
              style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
            >
              <CalendarDays className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium text-slate-600">Upcoming</p>
              <p className="text-lg sm:text-2xl font-bold text-slate-900">{events.filter(e => e.status === 'Upcoming').length}</p>
            </div>
            <div 
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-2 sm:mt-0"
              style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
            >
              <Target className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.coral})` }} />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium text-slate-600">Completed</p>
              <p className="text-lg sm:text-2xl font-bold text-slate-900">{events.filter(e => e.status === 'Completed').length}</p>
            </div>
            <div 
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-2 sm:mt-0"
              style={{ backgroundColor: `rgba(${brand.lilac}, 0.1)` }}
            >
              <Check className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.lilac})` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters - Mobile Responsive */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5" />
            <input
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Search by name, venue, or description"
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-slate-400 transition-colors text-sm sm:text-base"
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-2.5 pl-10 pr-8 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <input
              type="date" value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400 transition-colors"
              placeholder="From Date"
            />

            <input
              type="date" value={dateTo} onChange={(e)=>setDateTo(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400 transition-colors"
              placeholder="To Date"
            />
          </div>

          {/* Mobile Filters */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            <select
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-slate-900 focus:outline-none text-sm"
            >
              <option value="all">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={pageSize}
              onChange={(e)=>setPageSize(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-slate-900 focus:outline-none text-sm"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results meta */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-slate-600 mb-4 gap-2">
        <div>Showing {total.toLocaleString()} events</div>
        <div className="hidden sm:flex items-center gap-2">
          <span>Show:</span>
          <select
            value={pageSize}
            onChange={(e)=>setPageSize(Number(e.target.value))}
            className="bg-white border border-slate-300 rounded-md px-2 py-1 text-slate-900"
          >
            {[10,25,50,100].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span>per page</span>
        </div>
      </div>

      {/* Table - Mobile Responsive */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-3 sm:p-4 text-slate-700 font-medium text-sm">Event Name</th>
                <th className="p-3 sm:p-4 text-slate-700 font-medium text-sm">Date</th>
                <th className="p-3 sm:p-4 text-slate-700 font-medium text-sm hidden lg:table-cell">Venue</th>
                <th className="p-3 sm:p-4 text-slate-700 font-medium text-sm">Status</th>
                <th className="p-3 sm:p-4 text-slate-700 font-medium text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map(event => (
                <tr key={event.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-3 sm:p-4 font-medium">
                    <div>
                      <div className="text-slate-900 text-sm sm:text-base line-clamp-1">{event.name}</div>
                      {event.description && (
                        <div className="text-slate-500 text-xs mt-1 line-clamp-1">{event.description}</div>
                      )}
                      {/* Show venue on mobile */}
                      <div className="lg:hidden text-slate-500 text-xs mt-1">{event.venue}</div>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 text-slate-700 text-xs sm:text-sm">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="p-3 sm:p-4 hidden lg:table-cell text-slate-600 text-sm">{event.venue}</td>
                  <td className="p-3 sm:p-4">
                    <span className={`px-2 sm:px-3 py-1 text-xs rounded-full font-medium ${
                      event.status === 'Upcoming'
                        ? 'text-white'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                    style={event.status === 'Upcoming' 
                      ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.lilac}))` }
                      : {}
                    }>
                      {event.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-right">
                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                      <button
                        onClick={() => openEditModal(event)}
                        className="inline-flex items-center gap-1 hover:text-blue-700 transition-colors text-xs sm:text-sm font-medium p-1"
                        style={{ color: `rgb(${brand.indigo})` }}
                      >
                        <Edit3 className="h-3 h-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => removeEvent(event.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors text-xs sm:text-sm font-medium p-1"
                      >
                        <Trash2 className="h-3 h-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td className="p-8 text-center text-slate-500" colSpan={5}>
                    <div className="flex flex-col items-center">
                      <CalendarDays className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400 mb-3" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 mb-1">No events found</p>
                      <p className="text-sm text-slate-500">Try adjusting your filters or add a new event.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-t border-slate-200 bg-slate-50 gap-2">
          <div className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">Page {safePage} of {totalPages}</div>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={()=>setPage(p => Math.max(1, p-1))}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 text-slate-700 text-xs sm:text-sm"
              disabled={safePage <= 1}
            >
              <ChevronLeft className="h-3 h-3 sm:h-4 sm:w-4" /> 
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button
              onClick={()=>setPage(p => Math.min(totalPages, p+1))}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 text-slate-700 text-xs sm:text-sm"
              disabled={safePage >= totalPages}
            >
              <span className="hidden sm:inline">Next</span> <ChevronRight className="h-3 h-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal open={openAdd} onClose={()=>setOpenAdd(false)} title="Create Alumni Engagement Event">
        <EventForm form={form} setForm={setForm} errors={errors} />
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <button 
            onClick={()=>setOpenAdd(false)} 
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors text-slate-700"
          >
            Cancel
          </button>
          <button 
            onClick={addEvent} 
            className="px-4 py-2 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
          >
            Create Event
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal open={openEdit} onClose={()=>{setOpenEdit(false); setEditing(null);}} title="Edit Alumni Event">
        <EventForm form={form} setForm={setForm} errors={errors} />
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <button 
            onClick={()=>{setOpenEdit(false); setEditing(null);}} 
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors text-slate-700"
          >
            Cancel
          </button>
          <button 
            onClick={saveEdit} 
            className="px-4 py-2 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
}

function EventForm({ form, setForm, errors }) {
  const onChange = (e) => setForm((f)=>({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">Event Name</label>
        <input
          name="name" value={form.name} onChange={onChange}
          className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-slate-400 transition-colors"
          placeholder="Alumni Networking Meet 2025"
        />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">Date</label>
          <input
            type="date" name="date" value={form.date} onChange={onChange}
            className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400 transition-colors"
          />
          {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">Status</label>
          <select
            name="status" value={form.status} onChange={onChange}
            className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400 transition-colors"
          >
            <option>Upcoming</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">Venue</label>
        <input
          name="venue" value={form.venue} onChange={onChange}
          className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-slate-400 transition-colors"
          placeholder="Main Auditorium / Virtual Platform"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">Description</label>
        <textarea
          name="description" value={form.description} onChange={onChange} rows={3}
          className="w-full bg-white border border-slate-300 rounded-lg py-2.5 px-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-slate-400 transition-colors resize-none"
          placeholder="Event description focusing on alumni engagement, networking opportunities, and institutional relationship building..."
        />
      </div>
    </div>
  );
}
