// src/pages/Bills.jsx
import { useState, useEffect } from "react";
import API from "../api/auth";
import Table from "../components/Table";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [patientId, setPatientId] = useState("");

  const fetchBills = async () => {
    if (!patientId) return;
    try {
      const res = await API.get(`/patients/${patientId}`);
      setBills(res.data.bills || []);
    } catch (err) { console.error(err); }
  };

  const downloadPDF = (billId) => {
    window.open(`http://localhost:3000/api/bills/${billId}/pdf`, "_blank");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Bills</h2>
      <input type="text" placeholder="Patient ID" value={patientId} onChange={e => setPatientId(e.target.value)} className="border p-2 rounded w-64"/>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={fetchBills}>Fetch Bills</button>
      <Table 
        columns={["amount","paid","createdAt"]}
        data={bills}
        actions={[{ label:"PDF", onClick: (row) => downloadPDF(row._id) }]}
      />
    </div>
  );
}
