export const getPatients = async () => {
    const response = await fetch(
        `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/getPatients`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    return response.json();
};

export const createPatient = async (patientData) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/createPatient`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: window.localStorage.getItem("token"),
                },
                body: JSON.stringify(patientData),
            }
        );

        if (!response.ok) {
            throw new Error("Error creating patient");
        }

        return response.json(); // Assuming the API returns the created patient or some status
    } catch (error) {
        console.error("Failed to create patient:", error);
        throw error;
    }
};

export const addMedicationToPatient = async (medicationData) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/patients/addMedication`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: window.localStorage.getItem("token"),
                },
                body: JSON.stringify(medicationData),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add medication");
        }

        return response.json();
    } catch (error) {
        console.error("Error adding medication:", error);
        throw error;
    }
};

// Function to add a GP visit to a patient's record
export const addGPVisitToPatient = async (visitData) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/patients/addGPVisit`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: window.localStorage.getItem("token"),
                },
                body: JSON.stringify(visitData),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add GP visit");
        }

        return response.json();
    } catch (error) {
        console.error("Error adding GP visit:", error);
        throw error;
    }
};

export const getPatientById = async (id) => {
    console.log("Fetching patient with ID:", id);
    try {
        const response = await fetch(
            `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/getPatientById?id=${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: window.localStorage.getItem("token"),
                },
            }
        );
        // Check if response is OK (status 200)
        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`
            );
        }

        const data = response.json();
        console.log("Fetched patient data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching patient data:", error);
        throw error; // Re-throw the error to propagate it
    }
};

// Generate a presigned URL for S3 upload
export const generatePresignedUrl = async (fileName, fileType, patientId) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/generatePresignedUrl`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    fileName,
                    fileType,
                    patientId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        throw error;
    }
};

// Upload file directly to S3 using the presigned URL
export const uploadToS3 = async (presignedUrl, file, onProgressUpdate) => {
    try {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open("PUT", presignedUrl);
            xhr.setRequestHeader("Content-Type", file.type);

            // Handle progress events
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable && onProgressUpdate) {
                    const percentCompleted = Math.round(
                        (event.loaded * 100) / event.total
                    );
                    onProgressUpdate(percentCompleted);
                }
            };

            // Handle completion
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve();
                } else {
                    reject(
                        new Error(`Upload failed with status: ${xhr.status}`)
                    );
                }
            };

            // Handle errors
            xhr.onerror = () => {
                reject(new Error("Network error occurred during upload"));
            };

            // Start the upload
            xhr.send(file);
        });
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
};

// Save imaging metadata after S3 upload
export const saveImagingMetadata = async (metadata) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/saveImagingMetadata`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify(metadata),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error saving imaging metadata:", error);
        throw error;
    }
};

// Get all imaging records for a patient
export const getPatientImaging = async (patientId) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/getPatientImaging/${patientId}`,
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching patient imaging:", error);
        throw error;
    }
};

export const runModelInference = async (imageUrl) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/predictions/densenet201`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: window.localStorage.getItem("token"),
                },
                body: JSON.stringify({ url: imageUrl }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message ||
                    `Error running model inference: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to run model inference:", error);
        throw error;
    }
};

export const getEC2Metrics = async (torchServeInstanceId, appInstanceId) => {
    const queryParams = new URLSearchParams();

    if (torchServeInstanceId) {
        queryParams.append("torchServeInstanceId", torchServeInstanceId);
    }

    if (appInstanceId) {
        queryParams.append("appInstanceId", appInstanceId);
    }

    const queryString = queryParams.toString();
    const endpoint = `${
        process.env.REACT_APP_NODE_API_ENDPOINT_URL
    }/api/getEC2Metrics${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: window.localStorage.getItem("token"),
        },
    });

    return response.json();
};
