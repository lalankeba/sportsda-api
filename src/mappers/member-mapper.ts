import Member from "../interfaces/i-member";
import { MemberDocument } from "../models/member-model";

const mapDocumentToMember = (doc: MemberDocument): Member => {
  return {
    id: doc._id.toString(),
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    gender: doc.gender,
    roles: doc.roles,
    v: doc.__v
  };
};

const mapDocumentsToMembers = (docs: MemberDocument[]): Member[] => {
  return docs.map(doc => mapDocumentToMember(doc));
}

export { mapDocumentToMember, mapDocumentsToMembers };
