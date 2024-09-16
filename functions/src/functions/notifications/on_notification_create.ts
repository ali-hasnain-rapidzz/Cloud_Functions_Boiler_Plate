import * as functions from "firebase-functions";
import { FIREBASE_COLLECTIONS_NAME } from "../../constants/firebase.constants";
import { triggerErrorHandler } from "../../utils/error_handler.util";
import { LOG } from "../../utils/logger.util";

export const onNotificationCreate = functions.firestore
  .document(`${FIREBASE_COLLECTIONS_NAME.COLLECTION_NAME}/{docId}`)
  .onCreate(
    triggerErrorHandler(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (snap: functions.firestore.DocumentSnapshot, context: functions.EventContext) => {
        LOG("Notification created.");
      },
    ),
  );
