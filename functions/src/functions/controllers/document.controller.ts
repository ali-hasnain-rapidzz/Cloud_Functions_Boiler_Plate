import { LOG } from "../../utils/logger.util";
import { Request, Response } from "firebase-functions";
import { DocumentService } from "../service/document.service";

export class DocumentController {
  static async deleteDocument(req: Request, res: Response) {
    try {
      const { phone } = req.body;
      const message = await DocumentService.deleteDocumentByPhone(phone);
      LOG(`Request to delete document where ${phone}`);
      res.status(200).json({ message });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  }
}
