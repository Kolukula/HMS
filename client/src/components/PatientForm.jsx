// src/components/PatientForm.jsx
import { useState } from "react";

export default function PatientForm({ onSubmit, initialData }) {
  const [form, setForm] = useState(initialData || {
    firstName: "", lastName: "", email: "", phone: "", dob: "", gender: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-2 p-4 border rounded bg-white">
      <div className="flex space-x-2">
        <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="border p-2 rounded flex-1"/>
        <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="border p-2 rounded flex-1"/>
      </div>
      <div className="flex space-x-2">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded flex-1"/>
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border p-2 rounded flex-1"/>
      </div>
      <div className="flex space-x-2">
        <input type="date" name="dob" value={form.dob} onChange={handleChange} className="border p-2 rounded flex-1"/>
        <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded flex-1">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
