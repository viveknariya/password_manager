import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || ""; // Must be 256 bits (32 characters) in hex
const APP_SALT = process.env.APP_SALT || "";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Encrypts data using AES-256-GCM
 * @param text The plain text to encrypt
 * @returns The encrypted text in the format iv:authTag:encryptedContent
 */
export function encrypt(text: string): string {
  if (!ENCRYPTION_KEY || !APP_SALT) {
    throw new Error(
      "Encryption key or salt not found in environment variables",
    );
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv,
  );

  let encrypted = cipher.update(text + APP_SALT, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Decrypts data using AES-256-GCM
 * @param encryptedText The encrypted text in the format iv:authTag:encryptedContent
 * @returns The decrypted plain text
 */
export function decrypt(encryptedText: string): string {
  if (!ENCRYPTION_KEY || !APP_SALT) {
    throw new Error(
      "Encryption key or salt not found in environment variables",
    );
  }

  const parts = encryptedText.split(":");
  if (parts.length !== 3) {
    // If not in the expected format, return as is (might be legacy unencrypted data)
    return encryptedText;
  }

  const [ivHex, authTagHex, encryptedContentHex] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encryptedContent = Buffer.from(encryptedContentHex, "hex");

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv,
  );

  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedContentHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  // Remove salt
  if (decrypted.endsWith(APP_SALT)) {
    return decrypted.slice(0, -APP_SALT.length);
  }

  return decrypted;
}
