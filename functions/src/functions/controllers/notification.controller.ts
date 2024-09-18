import { LOG } from "../../utils/logger.util";
import * as functions from "firebase-functions";

import { NotificationService } from "../service/notification.service";

export class NotificationController {
  static async handleCreate(
    snap: FirebaseFirestore.DocumentSnapshot,
    _context: functions.EventContext,
  ) {
    try {
      await NotificationService.createNotification(snap);
      LOG("Notification created.");
    } catch (error) {
      throw error;
    }
  }
}
