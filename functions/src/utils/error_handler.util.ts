import * as functions from "firebase-functions";
import { ERROR, LOG } from "./logger.util";

export const triggerErrorHandler = (
  fn: (
    snap: functions.firestore.DocumentSnapshot,
    context: functions.EventContext,
  ) => Promise<void> | void,
) => {
  return async (snap: functions.firestore.DocumentSnapshot, context: functions.EventContext) => {
    try {
      await fn(snap, context);
    } catch (error) {
      ERROR("Error occurred in function:", error);
    }
  };
};

export const httpErrorHandler = (
  fn: (req: functions.Request, res: functions.Response) => Promise<void> | void,
) => {
  return async (req: functions.Request, res: functions.Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      LOG("Error occurred during HTTP request:", error);
      if (error instanceof Error) {
        res.status(500).json({
          message: "An internal server error occurred.",
          error: error.message,
          stack: error.stack,
        });
      } else {
        res.status(500).json({
          message: "An internal server error occurred.",
          error: "Unknown error",
          stack: (error as any)?.stack,
        });
      }
    }
  };
};
