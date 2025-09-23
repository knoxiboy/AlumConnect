import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const session = localStorage.getItem("alumnnet_admin_session");
  const isAuthed = Boolean(session);

  return isAuthed ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
