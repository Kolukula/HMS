// src/seed.js
import { connectDB, getDB } from "./services/db.js";
import bcrypt from "bcryptjs";

await connectDB();
const db = getDB();

const users = [
  { name: "Admin", email: "admin@hms.local", role: "ADMIN", password: "admin123" },
  { name: "Reception", email: "reception@hms.local", role: "RECEPTION", password: "rec123" },
  { name: "Doctor", email: "doc@hms.local", role: "DOCTOR", password: "doc123" },
  { name: "Lab", email: "lab@hms.local", role: "LAB", password: "lab123" }
];

for (const u of users) {
  const exists = await db.collection("users").findOne({ email: u.email });
  if (!exists) {
    const hash = await bcrypt.hash(u.password, 10);
    await db.collection("users").insertOne({ name: u.name, email: u.email, role: u.role, passwordHash: hash, createdAt: new Date() });
    console.log("Created", u.email);
  }
}

console.log("Seed done");
process.exit(0);
