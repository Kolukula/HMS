import { useEffect, useState } from "react";
import API from "../api/api.js";

export default function Dashboard() {
  const [stats, setStats] = useState({ patients:0, bills:0, labReports:0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/patients"); // Simplified counts
        setStats({ patients: res.data.total || res.data.length, bills:0, labReports:0 });
      } catch(err){ console.error(err); }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">Patients: {stats.patients}</div>
        <div className="bg-green-100 p-4 rounded shadow">Bills: {stats.bills}</div>
        <div className="bg-yellow-100 p-4 rounded shadow">Lab Reports: {stats.labReports}</div>
      </div>
    </div>
  );
}
