import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { FIREBASE_COLLECTIONS_NAME } from "../../constants/firebase.constants";
import { sendNotification } from "../../libraries/fb_notifications.lib";
import { NotificationType } from "../../types/firebase.types";
import { triggerErrorHandler } from "../../utils/error_handler.util";
import { LOG } from "../../utils/logger.util";

export const onNotificationCreate = functions.firestore
  .document(`${FIREBASE_COLLECTIONS_NAME.COLLECTION_NAME}/{docId}`)
  .onCreate(
    triggerErrorHandler(
      async (snap: functions.firestore.DocumentSnapshot, context: functions.EventContext) => {
        LOG("Notification created.");
      },
    ),
  );
