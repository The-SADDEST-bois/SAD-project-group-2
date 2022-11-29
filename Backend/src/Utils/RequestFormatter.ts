import { DocumentStatus } from "./DocumentStatus";

export const GetRoleFromRequest = (request: any) => {
  return request.body.role;
};

export const GetDocumentResult = (document: any) => {
  if (document.modifiedCount === 1) {
    return DocumentStatus.Updated;
  }
  if (document.modifiedCount === 0 && document.matchedCount === 1) {
    return DocumentStatus.PreviouslyUpdated;
  }
  if (document.matchedCount === 0) {
    return DocumentStatus.NotFound;
  }
  return DocumentStatus.Error;
}