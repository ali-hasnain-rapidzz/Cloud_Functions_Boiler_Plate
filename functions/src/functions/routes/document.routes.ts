import { POST } from "../../utils/http_calls.util";
import { validate } from "../../utils/validate.util";
import { phoneValidationSchema } from "../../validators/genric.validator";
import { DocumentController } from "../controllers/document.controller";
import { httpErrorHandler } from "../../utils/error_handler.util";

export const deleteDocument = POST(
  validate(phoneValidationSchema)(httpErrorHandler(DocumentController.deleteDocument)),
);
