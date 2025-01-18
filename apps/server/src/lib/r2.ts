import { createId } from "@paralleldrive/cuid2";

interface Env {
  BUCKET: R2Bucket;
  R2_PUBLIC_URL: string;
}

export async function uploadToR2(file: File, env: Env) {
  try {
    const fileExtension = file.name.split(".").pop();
    const key = `pieces/${createId()}.${fileExtension}`;
    const arrayBuffer = await file.arrayBuffer();

    console.log("Starting R2 upload:", {
      key,
      contentType: file.type,
      size: arrayBuffer.byteLength,
    });

    const response = await env.BUCKET.put(key, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    console.log("R2 upload response:", response);

    return { objectKey: key };
  } catch (error) {
    console.error("R2 upload error:", error);
    throw error;
  }
}

export async function deleteFromR2(key: string, env: Env) {
  await env.BUCKET.delete(key);
}
