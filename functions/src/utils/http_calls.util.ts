import * as functions from "firebase-functions";
import { corsLib } from "../config/cors.conf";
import { httpErrorHandler } from "./error_handler.util";
import { ERROR } from "./logger.util";

const createHttpRequest = (
  method: string,
  fn: (req: functions.Request, res: functions.Response) => Promise<void> | void,
) => {
  return functions.https.onRequest(
    httpErrorHandler(async (req: functions.Request, res: functions.Response) => {
      return corsLib(req, res, async () => {
        if (req.method !== method) {
          ERROR(`Invalid method. Expected ${method}.`);
          res.status(405).json({ success: false, message: "Method Not Allowed" });
          return;
        }

        // Capture the original `res.json`
        const originalJson = res.json.bind(res);

        // Override the `res.json` method to inject `success`
        res.json = (payload: any) => {
          // Use the status code to determine `success`
          const statusCode = res.statusCode;
          const success = statusCode >= 200 && statusCode < 300;

          // Call the original `res.json` with the modified payload
          return originalJson({
            ...payload,
            statusCode,
            success,
          });
        };

        await fn(req, res);
      });
    }),
  );
};

export const POST = (
  fn: (req: functions.Request, res: functions.Response) => Promise<void> | void,
) => createHttpRequest("POST", fn);

export const GET = (
  fn: (req: functions.Request, res: functions.Response) => Promise<void> | void,
) => createHttpRequest("GET", fn);

export const PUT = (
  fn: (req: functions.Request, res: functions.Response) => Promise<void> | void,
) => createHttpRequest("PUT", fn);

export const DELETE = (
  fn: (req: functions.Request, res: functions.Response) => Promise<void> | void,
) => createHttpRequest("DELETE", fn);
