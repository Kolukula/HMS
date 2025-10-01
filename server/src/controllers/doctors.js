import Record from "../models/Record.js";
import Patient from "../models/Patient.js";
import LabReport from "../models/LabReport.js";

// Add treatment record
export const addRecord = async (req, res) => {
  try {
    const { patientId, symptoms, diagnosis, treatment, prescription } = req.body;

    const record = new Record({
      patientId,
      doctorId: req.user._id, // from JWT
      symptoms,
      diagnosis,
      treatment,
      prescription,
    });

    await record.save();
    res.status(201).json({ message: "Record added", record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get patient history with pagination
export const getPatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const records = await Record.find({ patientId })
      .populate("doctorId", "name specialization")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Record.countDocuments({ patientId });

    res.json({ records, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get lab reports for a patient
export const getLabReports = async (req, res) => {
  try {
    const { patientId } = req.params;
    const reports = await LabReport.find({ patientId });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
