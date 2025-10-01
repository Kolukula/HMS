import Joi from "joi";

// User validation (for Admin creating users)
export const userValidator = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("ADMIN", "DOCTOR", "RECEPTIONIST", "LAB").required(),
  phone: Joi.string().optional(),
  specialization: Joi.string().optional(),
});

// Patient validation
export const patientValidator = Joi.object({
  name: Joi.string().required(),
  dob: Joi.date().optional(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  emergencyContact: Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    relation: Joi.string(),
  }).optional(),
});

// Record validation (for doctors)
export const recordValidator = Joi.object({
  patientId: Joi.string().required(),
  symptoms: Joi.string().optional(),
  diagnosis: Joi.string().optional(),
  treatment: Joi.string().optional(),
  prescription: Joi.string().optional(),
});
