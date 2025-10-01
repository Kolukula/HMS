// src/controllers/patients.js
import mongoose from "mongoose";
import Patient from "../models/Patient.js"; // Mongoose schema
import User from "../models/User.js";       // for doctor references if needed

// ➡️ Create Patient
export const createPatient = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      createdBy: req.user._id,   // already ObjectId from JWT middleware
    };

    const patient = new Patient(payload);
    await patient.save();

    res.json({ id: patient._id });
  } catch (err) {
    next(err);
  }
};

// ➡️ List Patients with search + pagination
export const listPatients = async (req, res, next) => {
  try {
    const q = req.query.q || "";
    const page = Math.max(1, parseInt(req.query.page || "1"));
    const limit = Math.min(100, parseInt(req.query.limit || "20"));
    const skip = (page - 1) * limit;

    // build filter
    const filter = q
      ? {
          $or: [
            { firstName: { $regex: q, $options: "i" } },
            { lastName: { $regex: q, $options: "i" } },
            { phone: { $regex: q } },
            { email: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      Patient.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Patient.countDocuments(filter),
    ]);

    res.json({ items, total, page, limit });
  } catch (err) {
    next(err);
  }
};

// ➡️ Get Patient by ID
export const getPatient = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid patient ID" });
    }

    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ error: "Not found" });

    res.json(patient);
  } catch (err) {
    next(err);
  }
};

// ➡️ Assign Doctor to Patient
export const assignDoctor = async (req, res, next) => {
  try {
    const { id } = req.params; // patient id
    const { doctorId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await Patient.findByIdAndUpdate(id, { assignedTo: doctorId });

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
