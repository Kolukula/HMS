import { useState } from "react";
import API from "../api";
import Table from "../components/Table";
import FileUpload from "../components/FileUpload";

export default function Labs() {
  const [patientId, setPatientId] = useState("");
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    if (!patientId) return;
    try {
      const res = await API.get(`/doctor/lab-reports/${patientId}`);
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return React.createElement("div", { className: "space-y-4" },
    React.createElement("h2", { className: "text-xl font-bold" }, "Lab Reports"),
    React.createElement("div", { className: "flex space-x-2" },
      React.createElement("input", {
        type: "text",
        placeholder: "Patient ID",
        value: patientId,
        onChange: e => setPatientId(e.target.value),
        className: "border p-2 rounded"
      }),
      React.createElement("button", {
        className: "bg-blue-500 text-white px-4 py-2 rounded",
        onClick: fetchReports
      }, "Fetch Reports")
    ),
    React.createElement(FileUpload, { patientId: patientId, onSuccess: fetchReports }),
    reports.length > 0 && React.createElement(Table, {
      columns: ["notes", "publicUrl", "uploadedBy", "createdAt"],
      data: reports.map(r => ({
        ...r,
        publicUrl: React.createElement("a", { href: r.publicUrl, target: "_blank" }, "View")
      }))
    })
  );
}
