// src/components/FileUpload.jsx
import { useState } from "react";
import API from "../api/auth";

export default function FileUpload({ patientId, onSuccess }) {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("notes", notes);

    try {
      await API.post(`/lab/${patientId}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" }});
      setFile(null); setNotes(""); onSuccess?.();
    } catch (err) {
      console.error(err); alert("Upload failed");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded bg-white">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input type="text" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="border p-2 rounded w-full"/>
      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
