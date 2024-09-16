import { FacultyDocument } from "../models/faculty-model";
import Faculty from "../interfaces/i-faculty";

const mapDocumentToFaculty = (doc: FacultyDocument): Faculty => {
  return {
    id: doc._id.toString(),
    name: doc.name,
    status: doc.status,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    v: doc.__v
  };
};

const mapDocumentsToFaculties = (docs: FacultyDocument[]): Faculty[] => {
  return docs.map(doc => mapDocumentToFaculty(doc));
}

export { mapDocumentToFaculty, mapDocumentsToFaculties };
