import { S3Client } from '@aws-sdk/client-s3';

const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
const region = import.meta.env.VITE_AWS_REGION;

const s3Client = new S3Client({
  region: region,
  credentials: { secretAccessKey, accessKeyId },
});

export default s3Client;
