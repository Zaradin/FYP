//const mongoose = require("mongoose");
import mongoose from "mongoose";

const ImagingSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        type: {
            type: String,
            enum: ["MRI", "CT", "PET", "X-Ray", "Ultrasound"],
            required: true,
        },
        studyDescription: {
            type: String,
            required: true,
        },
        seriesDescription: {
            type: String,
            required: true,
        },
        sliceThickness: {
            type: String,
            required: false,
        },
        resolution: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        s3Key: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileSize: {
            type: Number,
            required: true,
        },
        uploadDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Imaging = mongoose.model("Imaging", ImagingSchema);
export default Imaging;
