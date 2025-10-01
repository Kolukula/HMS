// src/pages/Patients.jsx
import { useState, useEffect } from "react";
import API from "../api/api.js";
import Table from "../components/Table";
import PatientForm from "../components/PatientForm";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await API.get("/patients");
      setPatients(res.data.items || res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleAdd = async (data) => {
    try { await API.post("/patients", data); fetchPatients(); } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchPatients(); }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Patients</h2>
      <PatientForm onSubmit={handleAdd} />
      {loading ? <p>Loading...</p> : (
        <Table 
          columns={["firstName","lastName","email","phone","dob","gender"]}
          data={patients}
        />
      )}
    </div>
  );
}
