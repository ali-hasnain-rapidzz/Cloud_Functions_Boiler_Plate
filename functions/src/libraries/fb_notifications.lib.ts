import * as admin from "firebase-admin";
import { ERROR, LOG, WARN } from "../utils/logger.util";

export interface NotificationData {
  tokens: string | string[];
  title?: string;
  body?: string;
  data?: { [key: string]: string };
  androidConfig?: admin.messaging.AndroidConfig;
  iosConfig?: admin.messaging.ApnsConfig;
}

// Generic function to send notifications or data messages
export const sendNotification = async (dataObj: NotificationData) => {
  const { tokens, title = "", body = "", data = {}, androidConfig, iosConfig } = dataObj;
  const tokensArr = Array.isArray(tokens) ? tokens : [tokens];
  if (tokensArr.length === 0) return;

  const message: admin.messaging.MulticastMessage = {
    tokens: tokensArr,
    notification: title || body ? { title, body } : undefined,
    data,
    android: androidConfig || {
      notification: {
        priority: "max",
        visibility: "public",
      },
      priority: "high",
    },
    apns: iosConfig || {
      payload: {
        aps: {
          alert: {
            title,
            body,
          },
          sound: "default",
        },
      },
    },
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    const successCount = response.successCount;
    const failureCount = response.failureCount;
    LOG(`Successfully sent ${successCount} messages`);
    if (failureCount > 0) {
      WARN(`Failed to send ${failureCount} messages`);
    }
  } catch (error) {
    ERROR("Error sending message:", error);
  }
};
