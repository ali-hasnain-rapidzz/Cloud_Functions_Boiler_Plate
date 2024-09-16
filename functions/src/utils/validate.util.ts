import * as functions from "firebase-functions";
import { AnyZodObject } from "zod";
import { ERROR, LOG } from "./logger.util";

// Middleware-like function to handle Zod validation for Firebase Functions
export const validate = (schema: AnyZodObject) => {
  return (fn: (req: functions.Request, res: functions.Response) => Promise<void>) => {
    return async (req: functions.Request, res: functions.Response) => {
      LOG("Validating request body:", req.body);
      const validationResult = schema.safeParse(req.body);

      if (!validationResult.success) {
        const errorMessages = validationResult.error.issues.map(
          (issue) => `${issue.path.join(".")}: ${issue.message}`,
        );
        ERROR("Validation failed:", errorMessages);
        res.status(400).json({ message: "Invalid request", errors: errorMessages });
        return;
      }

      // Attach validated data to the request object
      req.body = validationResult.data;

      // Proceed with the original function
      await fn(req, res);
    };
  };
};
