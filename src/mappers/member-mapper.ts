import Member from "../interfaces/i-member";
import { MemberDocument } from "../models/member-model";

const mapDocumentToMember = (doc: MemberDocument): Member => {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    gender: doc.gender,
    faculty: doc.faculty,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    v: doc.__v
  };
};

const mapDocumentsToMembers = (docs: MemberDocument[]): Member[] => {
  return docs.map(doc => mapDocumentToMember(doc));
}

export { mapDocumentToMember, mapDocumentsToMembers };
