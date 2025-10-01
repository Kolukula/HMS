import { useState, useEffect, useContext } from "react";
import { getUsers, createUser } from "../api/admin.js";
import Table from "../components/Table";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"RECEPTION" });

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch(err){ console.error(err); }
  };

  const handleAdd = async () => {
    try {
      await createUser(form);
      setForm({ name:"", email:"", password:"", role:"RECEPTION" });
      fetchUsers();
    } catch(err){ console.error(err); }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">User Management</h2>
      <div className="flex space-x-2">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="border p-2 rounded"/>
        <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="border p-2 rounded">
          <option value="ADMIN">ADMIN</option>
          <option value="DOCTOR">DOCTOR</option>
          <option value="RECEPTION">RECEPTION</option>
          <option value="LAB">LAB</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAdd}>Add User</button>
      </div>

      <Table
        columns={["name","email","role"]}
        data={users}
      />
    </div>
  );
}
