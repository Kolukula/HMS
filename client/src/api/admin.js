// import { useState, useEffect } from "react";
// import API from "../api/auth.js";
// import Table from "../components/Table";

// export default function Admin() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name:"", email:"", password:"", role:"RECEPTION" });

//   const fetchUsers = async () => {
//     try {
//       const res = await API.get("/admin/users");
//       setUsers(res.data);
//     } catch(err){ console.error(err); }
//   };

//   const handleAdd = async () => {
//     try {
//       await API.post("/admin/users", form);
//       setForm({ name:"", email:"", password:"", role:"RECEPTION" });
//       fetchUsers();
//     } catch(err){ console.error(err); }
//   };

//   useEffect(() => { fetchUsers(); }, []);

//   return React.createElement("div", { className: "space-y-4" },
//     React.createElement("h2", { className: "text-xl font-bold" }, "Admin - User Management"),
//     React.createElement("div", { className: "flex space-x-2" },
//       React.createElement("input", { placeholder:"Name", value: form.name, onChange: e => setForm({...form,name:e.target.value}), className: "border p-2 rounded" }),
//       React.createElement("input", { placeholder:"Email", value: form.email, onChange: e => setForm({...form,email:e.target.value}), className: "border p-2 rounded" }),
//       React.createElement("input", { placeholder:"Password", type:"password", value: form.password, onChange: e => setForm({...form,password:e.target.value}), className: "border p-2 rounded" }),
//       React.createElement("select", { value: form.role, onChange: e => setForm({...form,role:e.target.value}), className:"border p-2 rounded" },
//         React.createElement("option", { value:"ADMIN" }, "ADMIN"),
//         React.createElement("option", { value:"DOCTOR" }, "DOCTOR"),
//         React.createElement("option", { value:"RECEPTION" }, "RECEPTION"),
//         React.createElement("option", { value:"LAB" }, "LAB")
//       ),
//       React.createElement("button", { className:"bg-green-500 text-white px-4 py-2 rounded", onClick:handleAdd }, "Add User")
//     ),
//     React.createElement(Table, { columns: ["name","email","role"], data: users })
//   );
// }


// src/api/admin.js
import API from "./auth.js"; // your pre-configured Axios instance

// ➡️ Get all users
export const getUsers = async () => {
  try {
    const res = await API.get("/admin/users");
    return res;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

// ➡️ Create a new user
export const createUser = async (data) => {
  try {
    const res = await API.post("/admin/users", data);
    return res;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

// ➡️ Delete a user by ID (optional)
export const deleteUser = async (userId) => {
  try {
    const res = await API.delete(`/admin/users/${userId}`);
    return res;
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
};
