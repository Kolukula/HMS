// src/controllers/bills.js
import PDFDocument from "pdfkit";
import Bill from "../models/Bill.js";
import Patient from "../models/Patient.js";
import User from "../models/User.js";

// ➡️ Create Bill
export const createBill = async (req, res, next) => {
  try {
    const bill = new Bill({
      patientId: req.params.patientId,
      createdBy: req.user._id,
      items: req.body.items || [],       // [{ desc: "Consultation", price: 500 }]
      amount: req.body.amount || 0,
      paid: !!req.body.paid,
    });

    await bill.save();
    res.json({ id: bill._id });
  } catch (err) {
    next(err);
  }
};

// // ➡️ Generate PDF for a Bill
// export const getBillPdf = async (req, res, next) => {
//   try {
//     const bill = await Bill.findById(req.params.billId);
//     if (!bill) return res.status(404).json({ error: "Bill not found" });

//     const patient = await Patient.findById(bill.patientId);
//     const user = await User.findById(bill.createdBy);

//     // PDF Generation
//     const doc = new PDFDocument();
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", `attachment; filename=bill_${bill._id}.pdf`);

//     doc.fontSize(20).text("Hospital Invoice", { align: "center" });
//     doc.moveDown();
//     doc.fontSize(12).text(`Bill ID: ${bill._id}`);
//     doc.text(`Patient: ${patient?.firstName || ""} ${patient?.lastName || ""}`);
//     doc.text(`Created By: ${user?.name || ""}`);
//     doc.text(`Amount: ₹${bill.amount}`);
//     doc.moveDown();
//     doc.text("Items:");
//     bill.items.forEach((i) => doc.text(`${i.desc} - ₹${i.price}`));

//     doc.end();
//     doc.pipe(res);
//   } catch (err) {
//     next(err);
//   }
// };


export const getBillPdf = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.billId);
    if (!bill) return res.status(404).json({ error: "Bill not found" });

    const patient = await Patient.findById(bill.patientId);
    const user = await User.findById(bill.createdBy);

    // PDF Generation
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=bill_${bill._id}.pdf`
    );

    doc.pipe(res); // 👈 pipe before writing

    doc.fontSize(20).text("Hospital Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Bill ID: ${bill._id}`);
    doc.text(`Patient: ${patient?.firstName || ""} ${patient?.lastName || ""}`);
    doc.text(`Created By: ${user?.name || ""}`);
    doc.text(`Amount: ₹${bill.amount}`);
    doc.moveDown();
    doc.text("Items:");

    (bill.items || []).forEach((i) => {
      doc.text(`${i.desc} - ₹${i.price}`);
    });

    doc.end();
  } catch (err) {
    next(err);
  }
};
