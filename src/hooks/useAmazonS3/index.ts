import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3-client";
import { v4 as uuidv4 } from "uuid";

const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;

const useAmazonS3 = () => {
  const uploadBlob = async (blob: Blob) => {
    const key = uuidv4();

    const command = new PutObjectCommand({
      Bucket: bucketName,
      ContentType: blob.type,
      Body: blob,
      Key: key,
    });

    try {
      await s3Client.send(command);

      return key;
    } catch (err) {
      console.error("Error uploading blob:", err);
      throw err;
    }
  };

  return { uploadBlob };
};

export default useAmazonS3;
