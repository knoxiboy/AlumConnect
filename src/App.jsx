import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import ExplorePage from "./pages/ExplorePage";
import AuthPage from "./pages/AuthPage";
import CollegeRegistrationPage from "./pages/CollegeRegistrationPage";
import AdminLoginPage from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import ProtectedAdminRoute from "./pages/admin/ProtectedAdminRoute";

// Alumni Portal
import AlumniDashboard from "./pages/alumni/AlumniDashboard";
import AlumniProfile from "./pages/alumni/AlumniProfile";
import AlumniExplore from "./pages/alumni/AlumniExplore";
import AlumniEvents from "./pages/alumni/AlumniEvents";
import AlumniJobs from "./pages/alumni/AlumniJobs";

// Student Portal
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentExplore from "./pages/student/StudentExplore";
import StudentEvents from "./pages/student/StudentEvents";
import StudentJobs from "./pages/student/StudentJobs";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

const AdminApprovals = () => <div className="text-3xl font-bold">Alumni & Student Approvals</div>;

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/alumni-auth" element={<AuthPage />} />
        <Route path="/college-registration" element={<CollegeRegistrationPage />} />

        {/* Alumni Portal */}
        <Route element={<ProtectedRoute role="alumni" />}>
          <Route path="/alumni/dashboard" element={<AlumniDashboard />} />
          <Route path="/alumni/profile" element={<AlumniProfile />} />
          <Route path="/alumni/explore" element={<AlumniExplore />} />
          <Route path="/alumni/events" element={<AlumniEvents />} />
          <Route path="/alumni/jobs" element={<AlumniJobs />} />
        </Route>

        {/* Student Portal */}
        <Route element={<ProtectedRoute role="student" />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/explore" element={<StudentExplore />} />
          <Route path="/student/events" element={<StudentEvents />} />
          <Route path="/student/jobs" element={<StudentJobs />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="approvals" element={<AdminApprovals />} />
            <Route path="events" element={<AdminEvents />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
