import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";

// Types
type JsonObject = Record<string, unknown>;
type Nullable<T> = T | null;

interface JwtDecoded {
  exp: number;
  [key: string]: unknown;
}

const secretKey = "mysecret";

if (!secretKey) {
  throw new Error(
    "Secret key is not defined. Please set REACT_APP_SECRET_KEY in your environment variables."
  );
}

// Encryption
export const encryptData = <T extends JsonObject>(
  data: T,
  secretKey: string
): string => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  return ciphertext;
};

// Decryption
export const decryptData = <T>(
  ciphertext: string,
  secretKey: string
): Nullable<T> => {
  try {
    if (!ciphertext) {
      throw new Error("No ciphertext provided for decryption");
    }
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedData) {
      throw new Error("Failed to decrypt data or data is empty");
    }
    return JSON.parse(decryptedData) as T;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

// Get token from storage
const getTokenFromLocalStore = <T>(key: string): Nullable<T> => {
  try {
    const encryptedData = sessionStorage.getItem(key);
    if (!encryptedData) {
      console.warn(`No data found in sessionStorage for key: ${key}`);
      return null;
    }
    return decryptData<T>(encryptedData, secretKey);
  } catch (error) {
    console.error("Error retrieving token from local storage:", error);
    return null;
  }
};

// Save token to storage
const saveTokenToLocalStore = <T extends JsonObject>(
  key: string,
  value: T
): void => {
  const encryptedData = encryptData(value, secretKey);
  sessionStorage.setItem(key, encryptedData);
};

// Save simple key (string value)
const saveKeyToLocalStore = (key: string, value: string): void => {
  const encryptedData = encryptData({ value }, secretKey);
  sessionStorage.setItem(key, encryptedData);
};

// Clear all storage
const clearAll = (changeWindow: boolean = true): void => {
  sessionStorage.clear();
  if (changeWindow && typeof window !== "undefined") {
    window.location.href = "/auth";
  }
};

// Clear specific key
const clearKey = (specificKey: string): void => {
  sessionStorage.removeItem(specificKey);
};

// Token expiry checker
const checkTokenExpiry = (tokenStr?: string): boolean => {
  let expireTime = 0;
  if (expireTime === 0) {
    try {
      const token = tokenStr || getTokenFromLocalStore<string>("access_token");
      if (token) {
        const decodedToken = jwtDecode<JwtDecoded>(token);
        expireTime = decodedToken.exp;
      }
    } catch (error) {
      console.error("Token decoding failed:", error);
      return true;
    }
  }
  return Date.now() >= expireTime * 1000;
};

// Export functions
export {
  getTokenFromLocalStore,
  saveTokenToLocalStore,
  checkTokenExpiry,
  clearAll,
  clearKey,
  saveKeyToLocalStore,
};
