import * as functions from "firebase-functions";
import { POST } from "../../utils/http_calls.util";
import { LOG } from "../../utils/logger.util";
import { validate } from "../../utils/validate.util";
import { phoneValidationSchema, phoneValidationType } from "../../validators/genric.validator";

export const deleteDocument = POST(
  validate(phoneValidationSchema)(async (req: functions.Request, res: functions.Response) => {
    const { phone } = req.body as phoneValidationType;

    LOG(`Request to delete document where ${phone}`);

    res.status(200).json({
      message: `Documents with ${phone} deleted successfully.`,
    });
  }),
);
