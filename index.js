import { 
  S3Client, 
  GetObjectCommand, 
  PutObjectCommand 
} from "@aws-sdk/client-s3";

import sharp from "/opt/nodejs/node_modules/sharp/lib/index.js";

const s3 = new S3Client({ region: "ap-south-1" });

export const handler = async (event) => {
  try {
    const record = event.Records[0];
    const bucket = record.s3.bucket.name;

    // Fix key encoding (spaces become +)
    const rawKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

    console.log("Raw Key:", rawKey);

    if (!rawKey.startsWith("raw/")) {
      console.log("Not in raw folder. Skip.");
      return;
    }

    const optimizedKey = rawKey
      .replace("raw/", "optimized/")
      .replace(/\.[^/.]+$/, ".webp");

    // Download the image
    const getObj = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: rawKey,
      })
    );

    const bodyBytes = await getObj.Body.transformToByteArray();

    // Read metadata (image size)
    const metadata = await sharp(bodyBytes).metadata();

    let transformer = sharp(bodyBytes);

    // Resize if width > 1280
    if (metadata.width > 1280) {
      transformer = transformer.resize(1280);
    }

    // Convert ALL images → WebP (best compression)
    const optimizedBuffer = await transformer.webp({ quality: 70 }).toBuffer();

    // Upload optimized image
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: optimizedKey,
        Body: optimizedBuffer,
        ContentType: "image/webp",
      })
    );

    console.log("Optimized saved:", optimizedKey);

    return {
      status: "success",
      optimizedKey,
    };
  } catch (err) {
    console.log("Error:", err);
    throw err;
  }
};