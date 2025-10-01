import { useState, useContext } from "react";
import { login, setToken } from "../api/auth.js";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email:"", password:"" });
  const { setUser, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      setAuthToken(res.data.token);
      setUser(res.data.user);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch(err){ console.error(err); alert("Login failed"); }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border p-2 rounded w-full"/>
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="border p-2 rounded w-full"/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}
