import crypto from "node:crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || ""; // Must be 256 bits (32 bytes) - 64 hex characters
const APP_SALT = process.env.APP_SALT || "";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

function validateConfig() {
  if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
    throw new Error(
      "ENCRYPTION_KEY must be a 64-character hex string (256 bits)",
    );
  }
  if (!APP_SALT) {
    throw new Error("APP_SALT must be defined in environment variables");
  }
}

/**
 * Encrypts data using AES-256-GCM
 * @param text The plain text to encrypt
 * @returns The encrypted text in the format iv:authTag:encryptedContent
 */
export function encrypt(text: string): string {
  validateConfig();

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv,
  );

  // We prepend a unique marker or just use a more robust way to handle salt
  // For now, attaching it is okay, but we should ensure it's removed correctly.
  // Using a separator or fixed length would be better, but let's stick to the current logic with a fix.
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
  validateConfig();

  const parts = encryptedText.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted text format");
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

  let decrypted = decipher.update(encryptedContent, undefined, "utf8");
  decrypted += decipher.final("utf8");

  // Remove salt only from the end
  if (APP_SALT && decrypted.endsWith(APP_SALT)) {
    return decrypted.slice(0, -APP_SALT.length);
  }

  return decrypted;
}
