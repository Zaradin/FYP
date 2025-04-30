import mongoose from "mongoose";

// Schema for Medication
const MedicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        dose: {
            type: String,
            required: true,
        },
        frequency: {
            type: String,
            required: true,
        },
        amount: {
            type: String,
        },
        prescribedOn: {
            type: Date,
            required: true,
        },
        prescribedBy: {
            type: String,
            required: true,
        },
    },
    { _id: true, timestamps: true }
);

// Schema for GP Visits (Checkups)
const CheckupSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        doctor: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        note: {
            type: String,
        },
    },
    { _id: true, timestamps: true }
);

// Main Patient Schema
const PatientSchema = new mongoose.Schema(
    {
        patientFirstName: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[0-9]{7,15}$/.test(v);
                },
                message:
                    "Patient Phone number must be between 7 and 15 digits.",
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, "Please use a valid email address."],
        },
        gpAddress: {
            type: String,
            required: true,
        },
        gpName: {
            type: String,
            required: true,
        },
        gpPhone: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[0-9]{7,15}$/.test(v);
                },
                message: "GP Phone number must be between 7 and 15 digits.",
            },
        },
        // Add the new fields for medications and checkups
        medications: [MedicationSchema],
        checkups: [CheckupSchema],
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;
