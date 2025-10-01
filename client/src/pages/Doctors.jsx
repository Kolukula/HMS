// src/pages/Doctors.jsx
import { useState } from "react";
import API from "../api";
import Table from "../components/Table";

export default function Doctors() {
  const [patientId, setPatientId] = useState("");
  const [history, setHistory] = useState([]);
  const [labReports, setLabReports] = useState([]);

  const fetchHistory = async () => {
    if (!patientId) return;
    try {
      const res = await API.get(`/doctor/patient-history/${patientId}`);
      setHistory(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchLabReports = async () => {
    if (!patientId) return;
    try {
      const res = await API.get(`/doctor/lab-reports/${patientId}`);
      setLabReports(res.data);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Doctor Dashboard</h2>
      <div className="flex space-x-2">
        <input type="text" placeholder="Patient ID" value={patientId} onChange={e => setPatientId(e.target.value)} className="border p-2 rounded"/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={fetchHistory}>Fetch History</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={fetchLabReports}>Fetch Lab Reports</button>
      </div>

      {history.length > 0 && (
        <div>
          <h3 className="font-bold mt-4">Treatment History</h3>
          <Table columns={["date","notes","createdBy"]} data={history}/>
        </div>
      )}

      {labReports.length > 0 && (
        <div>
          <h3 className="font-bold mt-4">Lab Reports</h3>
          <Table columns={["notes","publicUrl","uploadedBy","createdAt"]} data={labReports.map(r=>({...r, publicUrl: <a href={r.publicUrl} target="_blank">View</a>}))}/>
        </div>
      )}
    </div>
  );
}
