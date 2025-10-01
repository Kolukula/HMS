import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitDate: { type: Date, default: Date.now },
    symptoms: { type: String },
    diagnosis: { type: String },
    treatment: { type: String },
    prescription: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Record", recordSchema);
