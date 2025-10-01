// src/server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import { register, login, logout } from "./controllers/auth.js";
import * as patients from "./controllers/patients.js";
import * as users from "./controllers/admin.js";
import * as records from "./controllers/doctors.js";
import * as labs from "./controllers/labs.js";
import * as bills from "./controllers/bills.js";
import { authenticate, permit } from "./middlewares/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import { uploadMiddleware } from "./controllers/labs.js";

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json());

await connectDB(); // ensure db connected before routes

app.get("/", (req, res) => res.send("Hospital Management System API"));

// Auth
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.post("/api/auth/logout", authenticate, logout);

// Admin routes
app.post("/api/admin/users", authenticate, permit("ADMIN"), users.createUser);
app.get("/api/admin/users", authenticate, permit("ADMIN"), users.getUsers);
// app.delete("/api/admin/users/:id", authenticate, permit("ADMIN"), users.deleteUser);

// Patients
app.post("/api/patients", authenticate, permit("RECEPTION","ADMIN"), patients.createPatient);
app.get("/api/patients", authenticate, permit("RECEPTION","DOCTOR","ADMIN"), patients.listPatients);
app.get("/api/patients/:id", authenticate, permit("RECEPTION","DOCTOR","ADMIN"), patients.getPatient);
app.post("/api/patients/:id/assign", authenticate, permit("RECEPTION","ADMIN"), patients.assignDoctor);

// Doctor routes
app.post("/api/doctor/records", authenticate, permit("DOCTOR"), records.addRecord);
app.get("/api/doctor/patient-history/:patientId", authenticate, permit("DOCTOR"), records.getPatientHistory);
app.get("/api/doctor/lab-reports/:patientId", authenticate, permit("DOCTOR"),  records.getLabReports);

// Lab upload
app.post("/api/lab/:patientId/upload", authenticate, permit("LAB","ADMIN"), uploadMiddleware, labs.uploadLab);

// Bills
app.post("/api/patients/:patientId/bills", authenticate, permit("RECEPTION","ADMIN"), bills.createBill);
app.get("/api/bills/:billId/pdf", authenticate, permit("RECEPTION","ADMIN","DOCTOR"), bills.getBillPdf);


// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
