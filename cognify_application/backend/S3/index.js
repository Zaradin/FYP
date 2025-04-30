import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// S3 bucket name
const S3_BUCKET = process.env.S3_BUCKET_NAME;

// Generate a presigned URL for uploading to S3
export const generatePresignedUrl = async (key, contentType) => {
    const params = {
        Bucket: S3_BUCKET,
        Key: key,
        Expires: 60 * 5, // URL expires in 5 minutes
        ContentType: contentType,
    };

    try {
        const url = await s3.getSignedUrlPromise("putObject", params);
        return url;
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        throw error;
    }
};

export { s3, S3_BUCKET };
