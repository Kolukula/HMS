import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <ul className="space-y-2">
        <li><Link to="/dashboard">Dashboard</Link></li>
        {["RECEPTION","ADMIN"].includes(user?.role) && <li><Link to="/patients">Patients</Link></li>}
        {["DOCTOR"].includes(user?.role) && <li><Link to="/doctor">Patients</Link></li>}
        {["LAB","ADMIN"].includes(user?.role) && <li><Link to="/labs">Lab Reports</Link></li>}
        {["RECEPTION","ADMIN"].includes(user?.role) && <li><Link to="/bills">Bills</Link></li>}
        {user?.role === "ADMIN" && <li><Link to="/admin">Admin</Link></li>}
      </ul>
    </aside>
  );
}
