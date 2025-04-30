import asyncHandler from "express-async-handler";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import Patient from "./patientModel.js";
import Imaging from "./imagingModel.js";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import FormData from "form-data";
import os from "os";
import { s3, generatePresignedUrl, S3_BUCKET } from "../../S3/index.js";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Configure AWS credentials
const configureAWS = () => {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });
};

router.get(
    "/getPatients",
    asyncHandler(async (req, res) => {
        try {
            const patients = await Patient.find(); // Fetch all patients
            res.status(200).json(patients);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching patients",
                error: error.message,
            });
        }
    })
);

router.post(
    "/createPatient",
    asyncHandler(async (req, res) => {
        try {
            // Create a new patient record
            const {
                patientFirstName,
                surname,
                dob,
                gender,
                address,
                phoneNumber,
                email,
                gpAddress,
                gpName,
                gpPhone,
            } = req.body;

            const newPatient = new Patient({
                patientFirstName,
                surname,
                dob,
                gender,
                address,
                phoneNumber,
                email,
                gpAddress,
                gpName,
                gpPhone,
            });

            // Save the patient record to the database
            await newPatient.save();

            // Send response back to the client
            res.status(201).json({
                message: "Patient created successfully",
                patient: newPatient,
            });
        } catch (error) {
            // Handle any errors that occur during patient creation
            console.error(error);
            res.status(500).json({
                message: "Server error. Unable to create patient.",
            });
        }
    })
);

router.get(
    "/getPatientById",
    asyncHandler(async (req, res) => {
        try {
            const { id } = req.query;
            console.log("Looking up patient with ID:", id);

            // Get patient basic information
            const patient = await Patient.findById(id);

            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }

            // Get patient's imaging records
            const imaging = await Imaging.find({ patientId: id }).sort({
                uploadDate: -1,
            });

            // Format the response to include imaging data
            const responseData = {
                ...patient.toObject(),
                imaging: imaging.map((img) => ({
                    id: img._id,
                    type: img.type,
                    date: new Date(img.uploadDate).toLocaleDateString(),
                    studyDescription: img.studyDescription,
                    seriesDescription: img.seriesDescription,
                    sliceThickness: img.sliceThickness,
                    resolution: img.resolution,
                    description: img.description,
                    url: img.imageUrl,
                    fileName: img.fileName,
                    fileSize: img.fileSize,
                })),
            };

            res.status(200).json(responseData);
        } catch (error) {
            console.error("Error fetching patient data:", error);
            res.status(500).json({
                message: "Server error. Unable to fetch patient details.",
                error: error.message,
            });
        }
    })
);

// Route to add a medication to a patient
router.post(
    "/patients/addMedication",
    asyncHandler(async (req, res) => {
        try {
            const {
                patientId,
                name,
                dose,
                frequency,
                amount,
                prescribedOn,
                prescribedBy,
            } = req.body;

            // Find the patient by ID
            const patient = await Patient.findById(patientId);

            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }

            // Create a new medication object
            const newMedication = {
                name,
                dose,
                frequency,
                amount,
                prescribedOn,
                prescribedBy,
            };

            // Initialize medications array if it doesn't exist
            if (!patient.medications) {
                patient.medications = [];
            }

            // Add the new medication to the patient's medications array
            patient.medications.push(newMedication);

            // Save the updated patient
            await patient.save();

            res.status(200).json({
                message: "Medication added successfully",
                medication: newMedication,
            });
        } catch (error) {
            console.error("Error adding medication:", error);
            res.status(500).json({
                message: "Server error. Unable to add medication.",
            });
        }
    })
);

// Route to add a GP visit to a patient
router.post(
    "/patients/addGPVisit",
    asyncHandler(async (req, res) => {
        try {
            const { patientId, date, doctor, summary, note } = req.body;

            // Find the patient by ID
            const patient = await Patient.findById(patientId);

            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }

            // Create a new GP visit object
            const newVisit = {
                date,
                doctor,
                summary,
                note,
            };

            // Initialize checkups array if it doesn't exist
            if (!patient.checkups) {
                patient.checkups = [];
            }

            // Add the new visit to the patient's checkups array
            patient.checkups.push(newVisit);

            // Save the updated patient
            await patient.save();

            res.status(200).json({
                message: "GP visit added successfully",
                visit: newVisit,
            });
        } catch (error) {
            console.error("Error adding GP visit:", error);
            res.status(500).json({
                message: "Server error. Unable to add GP visit.",
            });
        }
    })
);

// Generate a presigned URL for direct S3 upload
router.post(
    "/generatePresignedUrl",
    asyncHandler(async (req, res) => {
        try {
            const { fileName, fileType, patientId } = req.body;

            // Ensure the patient exists
            const patient = await Patient.findById(patientId);
            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }

            // Generate a unique key for the file
            // Format: patients/{patientId}/imaging/{uniqueId}-{fileName}
            const fileKey = `patients/${patientId}/imaging/${uuidv4()}-${fileName}`;

            // Generate the presigned URL
            const presignedUrl = await generatePresignedUrl(fileKey, fileType);

            res.status(200).json({
                presignedUrl,
                fileKey,
                s3Bucket: S3_BUCKET,
            });
        } catch (error) {
            console.error("Error generating presigned URL:", error);
            res.status(500).json({
                message: "Failed to generate upload URL",
                error: error.message,
            });
        }
    })
);

// Save imaging metadata after successful S3 upload
router.post(
    "/saveImagingMetadata",
    asyncHandler(async (req, res) => {
        try {
            const {
                patientId,
                type,
                studyDescription,
                seriesDescription,
                sliceThickness,
                resolution,
                description,
                s3Key,
                fileName,
                fileSize,
            } = req.body;

            // Construct the S3 URL
            const imageUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${s3Key}`;

            // Create a new imaging record
            const newImaging = new Imaging({
                patientId,
                type,
                studyDescription,
                seriesDescription,
                sliceThickness,
                resolution,
                description,
                imageUrl,
                s3Key,
                fileName,
                fileSize,
            });

            // Save the imaging record
            await newImaging.save();

            res.status(201).json({
                message: "Imaging record created successfully",
                imaging: newImaging,
            });
        } catch (error) {
            console.error("Error saving imaging metadata:", error);
            res.status(500).json({
                message: "Failed to save imaging metadata",
                error: error.message,
            });
        }
    })
);

// Get all imaging records for a patient
router.get(
    "/getPatientImaging/:patientId",
    asyncHandler(async (req, res) => {
        try {
            const { patientId } = req.params;

            // Find all imaging records for the patient
            const imagingRecords = await Imaging.find({ patientId }).sort({
                uploadDate: -1,
            });

            res.status(200).json(imagingRecords);
        } catch (error) {
            console.error("Error fetching patient imaging records:", error);
            res.status(500).json({
                message: "Failed to fetch imaging records",
                error: error.message,
            });
        }
    })
);

const parseS3Url = (url) => {
    // If the URL contains the S3_BUCKET directly, just extract the key
    if (url.includes(S3_BUCKET)) {
        const baseUrl = `https://${S3_BUCKET}.s3.amazonaws.com/`;
        if (url.startsWith(baseUrl)) {
            return {
                bucket: S3_BUCKET,
                key: url.substring(baseUrl.length),
            };
        }
    }

    // Generic parsing for other URL formats
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter((part) => part);

    if (urlObj.hostname.includes("s3.")) {
        // Format: https://s3.<region>.amazonaws.com/<bucket>/<key>
        return {
            bucket: pathParts[0],
            key: pathParts.slice(1).join("/"),
        };
    } else {
        // Format: https://<bucket>.s3.<region>.amazonaws.com/<key>
        return {
            bucket: urlObj.hostname.split(".")[0],
            key: pathParts.join("/"),
        };
    }
};

router.post(
    "/predictions/densenet201",
    asyncHandler(async (req, res) => {
        const { url } = req.body;
        let tempFilePath = null;

        try {
            if (!url) {
                return res.status(400).json({
                    message: "Image URL is required",
                });
            }

            // Parse the S3 URL to get bucket and key
            const { bucket, key } = parseS3Url(url);

            // Create a temporary file path
            const tempDir = os.tmpdir();
            const fileName = `${uuidv4()}${path.extname(key)}`;
            tempFilePath = path.join(tempDir, fileName);

            console.log(`Downloading file from S3: ${bucket}/${key}`);

            // Download the file from S3
            const s3Object = await s3
                .getObject({
                    Bucket: bucket,
                    Key: key,
                })
                .promise();

            // Write to temporary file
            fs.writeFileSync(tempFilePath, s3Object.Body);
            console.log(`File downloaded to ${tempFilePath}`);

            // FIXED: Using FormData correctly with file buffer
            const fileBuffer = fs.readFileSync(tempFilePath);
            const form = new FormData();

            // Add the file as a buffer instead of a stream
            form.append("data", fileBuffer, {
                filename: path.basename(key),
                contentType: "application/octet-stream",
            });

            // Send to TorchServe
            const inferenceUrl = `http://${process.env.TORCHSERVE_ENDPOINT}:8080/predictions/densenet201v2`;

            console.log(`Sending file to TorchServe: ${inferenceUrl}`);

            const inferenceResponse = await fetch(inferenceUrl, {
                method: "POST",
                body: form,
            });

            if (!inferenceResponse.ok) {
                throw new Error(
                    `Inference request failed with status ${inferenceResponse.status}`
                );
            }

            const inferenceData = await inferenceResponse.json();
            console.log("Inference complete, cleaning up");

            // Clean up the temporary file
            if (tempFilePath && fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
                console.log(`Temporary file deleted: ${tempFilePath}`);
            }

            // Return the inference results
            return res.status(200).json(inferenceData);
        } catch (error) {
            console.error("Error during inference process:", error);

            // Clean up temp file if it exists
            if (tempFilePath && fs.existsSync(tempFilePath)) {
                try {
                    fs.unlinkSync(tempFilePath);
                    console.log(`Cleaned up temporary file: ${tempFilePath}`);
                } catch (cleanupError) {
                    console.error(
                        "Error cleaning up temporary file:",
                        cleanupError
                    );
                }
            }

            return res.status(500).json({
                message: "Failed to run model inference",
                error: error.message,
            });
        }
    })
);

// Get CloudWatch metrics for EC2 instances
router.get(
    "/getEC2Metrics",
    asyncHandler(async (req, res) => {
        try {
            configureAWS();
            const cloudwatch = new AWS.CloudWatch();

            // Get instance IDs from query params or use defaults
            const torchServeInstanceId =
                req.query.torchServeInstanceId ||
                process.env.TORCHSERVE_INSTANCE_ID; // Replace with your TorchServe instance ID
            const appInstanceId = req.query.appInstanceId || APP_INSTANCE_ID; // Replace with your application instance ID

            const startTime = new Date();
            startTime.setHours(startTime.getHours() - 3); // Last 3 hours of data

            // Define metrics to retrieve - only CPU and Network metrics
            const metricsToFetch = [
                { name: "CPUUtilization", stat: "Average", unit: "Percent" },
                { name: "NetworkIn", stat: "Sum", unit: "Bytes" },
                { name: "NetworkOut", stat: "Sum", unit: "Bytes" },
            ];

            // Fetch metrics for both instances
            const [torchServeMetrics, appMetrics] = await Promise.all([
                fetchInstanceMetrics(
                    cloudwatch,
                    torchServeInstanceId,
                    metricsToFetch,
                    startTime
                ),
                fetchInstanceMetrics(
                    cloudwatch,
                    appInstanceId,
                    metricsToFetch,
                    startTime
                ),
            ]);

            res.status(200).json({
                torchServeMetrics,
                appMetrics,
            });
        } catch (error) {
            console.error("Error fetching EC2 metrics:", error);
            res.status(500).json({
                message: "Error fetching EC2 metrics",
                error: error.message,
            });
        }
    })
);

// Helper function to fetch metrics for a specific instance
async function fetchInstanceMetrics(
    cloudwatch,
    instanceId,
    metricsToFetch,
    startTime
) {
    const metricData = [];

    for (const metric of metricsToFetch) {
        try {
            const params = {
                MetricDataQueries: [
                    {
                        Id: `m_${metric.name}`,
                        MetricStat: {
                            Metric: {
                                Namespace: "AWS/EC2",
                                MetricName: metric.name,
                                Dimensions: [
                                    {
                                        Name: "InstanceId",
                                        Value: instanceId,
                                    },
                                ],
                            },
                            Period: 300, // 5-minute intervals
                            Stat: metric.stat,
                            Unit: metric.unit,
                        },
                        ReturnData: true,
                    },
                ],
                StartTime: startTime,
                EndTime: new Date(),
            };

            const result = await cloudwatch.getMetricData(params).promise();

            // Format the data for easier consumption by the frontend
            if (
                result.MetricDataResults &&
                result.MetricDataResults.length > 0
            ) {
                const metricResult = result.MetricDataResults[0];
                const formattedData = metricResult.Timestamps.map(
                    (timestamp, index) => {
                        return {
                            timestamp: timestamp.toISOString(),
                            value: metricResult.Values[index],
                        };
                    }
                ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                metricData.push({
                    name: metric.name,
                    unit: metric.unit,
                    data: formattedData,
                });
            }
        } catch (error) {
            console.error(
                `Error fetching ${metric.name} for instance ${instanceId}:`,
                error
            );
            // Continue with other metrics even if one fails
        }
    }

    return {
        instanceId,
        metrics: metricData,
    };
}

export default router;
