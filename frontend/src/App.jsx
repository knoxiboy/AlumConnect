import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { testDB } from "./utils/api";
import Landing from "./pages/Landing";
import ExplorePage from "./pages/ExplorePage";
import Contacts from "./pages/Contacts";
import AuthPage from "./pages/AuthPage";
import CollegeRegistrationPage from "./pages/CollegeRegistrationPage";
import AdminLoginPage from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import StatsPage from "./pages/admin/StatsPage";
import ProtectedAdminRoute from "./pages/admin/ProtectedAdminRoute";

// Alumni Portal
import AlumniDashboard from "./pages/alumni/AlumniDashboard";
import AlumniProfile from "./pages/alumni/AlumniProfile";
import AlumniExplore from "./pages/alumni/AlumniExplore";
import AlumniEvents from "./pages/alumni/AlumniEvents";
import AlumniCareerCenter from "./pages/alumni/AlumniCareerCenter";
import AlumniNetwork from "./pages/alumni/AlumniNetwork";

// Student Portal
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentExplore from "./pages/student/StudentExplore";
import StudentEvents from "./pages/student/StudentEvents";
import StudentCareerCenter from "./pages/student/StudentCareerCenter";
import StudentNetwork from "./pages/student/StudentNetwork";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  const [dbStatus, setDbStatus] = useState("");

  useEffect(() => {
    const checkDb = async () => {
      try {
        const data = await testDB();
        setDbStatus(data.message);
      } catch (error) {
        setDbStatus("Error connecting to the database");
      }
    };
    checkDb();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/alumni-auth" element={<AuthPage />} />
        <Route path="/college-registration" element={<CollegeRegistrationPage />} />

        {/* Alumni Portal */}
        <Route element={<ProtectedRoute role="alumni" />}>
          <Route path="/alumni/dashboard" element={<AlumniDashboard />} />
          <Route path="/alumni/profile" element={<AlumniProfile />} />
          <Route path="/alumni/explore" element={<AlumniExplore />} />
          <Route path="/alumni/events" element={<AlumniEvents />} />
          <Route path="/alumni/career-center" element={<AlumniCareerCenter />} />
          <Route path="/alumni/network" element={<AlumniNetwork />} />
        </Route>

        {/* Student Portal */}
        <Route element={<ProtectedRoute role="student" />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/explore" element={<StudentExplore />} />
          <Route path="/student/events" element={<StudentEvents />} />
          <Route path="/student/jobs" element={<StudentCareerCenter />} />
          <Route path="/student/network" element={<StudentNetwork />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />} >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="events" element={<AdminEvents />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
