import { DocumentStatus } from "./DocumentStatus";
import { GetDocumentResult } from "./RequestFormatter";

export const DocumentResultManager = (document: any) => {
    const result = GetDocumentResult(document);
    return result;
};