import * as functions from "firebase-functions";
import { NotificationController } from "../controllers/notification.controller";
import { triggerErrorHandler } from "../../utils/error_handler.util";
import { FIREBASE_COLLECTIONS_NAME } from "../../constants/firebase.constants";

export const onNotificationCreate = functions.firestore
  .document(`${FIREBASE_COLLECTIONS_NAME.COLLECTION_NAME}/{docId}`)
  .onCreate(triggerErrorHandler(NotificationController.handleCreate));
