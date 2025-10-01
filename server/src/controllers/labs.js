// src/controllers/labs.js
import multer from "multer";
import fs from "fs/promises";
import cloudinary from "../services/cloudinary.js";
import LabReport from "../models/LabReport.js"; // Mongoose model

// Multer setup (temporary storage)
const upload = multer({ dest: "/tmp/uploads" });
export const uploadMiddleware = upload.single("file");

// Upload lab report
export const uploadLab = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const path = req.file.path;

    // Upload to Cloudinary (auto detects PDF/image)
    const result = await cloudinary.uploader.upload(path, {
      folder: `hms/lab/${req.params.patientId}`,
      resource_type: "auto",
    });

    await fs.unlink(path); // remove temp file

    // Store metadata in Mongoose
    const labReport = new LabReport({
      patientId: req.params.patientId,       // ObjectId handled by schema
      labStaffId: req.user._id,              // uploader
      reportType: req.body.reportType || "General",
      reportUrl: result.secure_url,
      publicId: result.public_id,
      notes: req.body.notes || "",
    });

    // console.log("Lab Report to be saved:", labReport);

    await labReport.save();

    res.json({ id: labReport._id, labReport });
  } catch (err) {
    next(err);
  }
};
