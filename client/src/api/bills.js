import { useState } from "react";
import API, { getBillPdf } from "../api";
import Table from "../components/Table";

export default function Bills() {
  const [patientId, setPatientId] = useState("");
  const [bills, setBills] = useState([]);
  const [amount, setAmount] = useState(0);
  const [items, setItems] = useState("");

  const fetchBills = async () => {
    if (!patientId) return;
    try {
      const res = await API.get(`/patients/${patientId}`);
      setBills(res.data.bills || []);
    } catch (err) { console.error(err); }
  };

  const handleCreate = async () => {
    try {
      const itemsArray = items.split(",").map(i=>({ desc:i, price:0 }));
      await API.post(`/patients/${patientId}/bills`, { amount, items:itemsArray, paid:true });
      setAmount(0); setItems("");
      fetchBills();
    } catch(err){ console.error(err); }
  };

  const downloadPDF = (billId) => {
    window.open(getBillPdf(billId), "_blank");
  };

  return React.createElement("div", { className: "space-y-4" },
    React.createElement("h2", { className:"text-xl font-bold" }, "Bills"),
    React.createElement("div", { className:"flex space-x-2" },
      React.createElement("input", { type:"text", placeholder:"Patient ID", value:patientId, onChange:e=>setPatientId(e.target.value), className:"border p-2 rounded" }),
      React.createElement("input", { type:"number", placeholder:"Amount", value:amount, onChange:e=>setAmount(Number(e.target.value)), className:"border p-2 rounded" }),
      React.createElement("input", { type:"text", placeholder:"Items (comma separated)", value:items, onChange:e=>setItems(e.target.value), className:"border p-2 rounded" }),
      React.createElement("button", { className:"bg-green-500 text-white px-4 py-2 rounded", onClick:handleCreate }, "Create Bill"),
      React.createElement("button", { className:"bg-blue-500 text-white px-4 py-2 rounded", onClick:fetchBills }, "Fetch Bills")
    ),
    React.createElement(Table, { columns:["amount","paid","createdAt"], data:bills, actions:[{ label:"PDF", onClick:(row)=>downloadPDF(row._id) }] })
  );
}
