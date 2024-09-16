import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { POST } from "../../utils/http_calls.util";
import { ERROR, LOG } from "../../utils/logger.util";
import { validate } from "../../utils/validate.util";
import { phoneValidationSchema, phoneValidationType } from "../../validators/genric.validator";

export const deleteDocument = POST(
  validate(phoneValidationSchema)(async (req: functions.Request, res: functions.Response) => {
    const { identifier, collection, field } = req.body as phoneValidationType;

    if (!identifier || !collection || !field) {
      LOG("Required parameters not provided in the request.");
      res.status(400).json({ message: "Identifier, collection, and field are required." });
      return;
    }

    LOG(
      `Request to delete document where ${field} matches ${identifier} in collection ${collection}`,
    );

    try {
      const querySnapshot = await admin
        .firestore()
        .collection(collection)
        .where(field, "==", identifier)
        .get();

      if (querySnapshot.empty) {
        LOG(`No documents found with ${field} matching ${identifier} in collection ${collection}.`);
        res.status(404).json({ message: "No matching documents found." });
        return;
      }

      const deletionPromises = querySnapshot.docs.map(async (doc) => {
        await doc.ref.delete();
        LOG(`Document with ID ${doc.id} deleted from collection ${collection}.`);
      });

      await Promise.all(deletionPromises);

      res.status(200).json({
        message: `Documents with ${field} matching ${identifier} deleted successfully from ${collection}.`,
      });
    } catch (error) {
      ERROR(`Error deleting documents from ${collection}:`, error);
      res.status(500).json({ message: `Error deleting documents from ${collection}.` });
    }
  }),
);
