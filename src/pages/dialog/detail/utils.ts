const region = import.meta.env.VITE_AWS_REGION;
const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;

export const makeS3Uri = (id: string) =>
  `https://s3.${region}.amazonaws.com/${bucketName}/${id}`;
