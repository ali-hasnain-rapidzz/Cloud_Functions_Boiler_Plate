export class DocumentService {
  static async deleteDocumentByPhone(phone: string): Promise<string> {
    return `Documents with phone ${phone} deleted successfully.`;
  }
}
