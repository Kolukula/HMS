// src/pages/Labs.jsx
import { useState, useEffect } from "react";
import API from "../api/auth";
import Table from "../components/Table";
import FileUpload from "../components/FileUpload";

export default function Labs() {
  const [reports, setReports] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    if (!patientId) return;
    setLoading(true);
    try {
      const res = await API.get(`/doctor/lab-reports/${patientId}`);
      setReports(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Lab Reports</h2>
      <input type="text" placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} className="border p-2 rounded w-64"/>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={fetchReports}>Fetch Reports</button>
      <FileUpload patientId={patientId} onSuccess={fetchReports}/>
      {loading ? <p>Loading...</p> : (
        <Table 
          columns={["notes","publicUrl","uploadedBy","createdAt"]}
          data={reports.map(r => ({...r, publicUrl: <a href={r.publicUrl} target="_blank">View</a>}))}
        />
      )}
    </div>
  );
}
