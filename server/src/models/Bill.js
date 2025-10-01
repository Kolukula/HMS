import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PAID", "UNPAID", "PENDING"],
      default: "PENDING",
    },
    services: [
      {
        description: String,
        cost: Number,
      },
    ],
    pdfUrl: { type: String }, // Cloudinary PDF link
    paymentDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", billSchema);
