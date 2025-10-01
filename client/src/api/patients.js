import { useState, useEffect } from "react";
import API from "../api/auth.js";
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
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleAdd = async (data) => {
    try {
      await API.post("/patients", data);
      fetchPatients();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignDoctor = async (patientId, doctorId) => {
    try {
      await API.post(`/patients/${patientId}/assign`, { doctorId });
      fetchPatients();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return React.createElement("div", { className: "space-y-4" },
    React.createElement("h2", { className: "text-xl font-bold" }, "Patients"),
    React.createElement(PatientForm, { onSubmit: handleAdd }),
    loading ? React.createElement("p", null, "Loading...") :
      React.createElement(Table, {
        columns: ["firstName", "lastName", "email", "phone", "dob", "gender"],
        data: patients,
        actions: [{
          label: "Assign Doctor",
          onClick: row => {
            const doctorId = prompt("Enter Doctor ID");
            handleAssignDoctor(row._id, doctorId);
          }
        }]
      })
  );
}
