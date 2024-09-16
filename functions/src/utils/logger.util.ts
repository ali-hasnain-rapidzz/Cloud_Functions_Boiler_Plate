import { logger as firebaseLogger } from "firebase-functions";

// Firebase log levels
export const LOG = (...args: any[]) => {
  console.log(...args); // Log to console
  firebaseLogger.log(...args); // Log to Firebase
};

export const ERROR = (...args: any[]) => {
  console.error(...args); // Log to console
  firebaseLogger.error(...args); // Log to Firebase
};

export const WARN = (...args: any[]) => {
  console.warn(...args); // Log to console
  firebaseLogger.warn(...args); // Log to Firebase
};
