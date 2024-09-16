/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as admin from "firebase-admin";
import { onNotificationCreate } from "./functions/routes/notification.routes";
import { deleteDocument } from "./functions/routes/document.routes";

// Initialize Firebase Admin SDK once
admin.initializeApp();

// Export the Cloud Functions
exports.onNotificationCreate = onNotificationCreate;
exports.deleteDocument = deleteDocument;
