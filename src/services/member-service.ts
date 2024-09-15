import Member from "../interfaces/i-member";
import MemberModel from "../models/member-model";
import { validatePaginationDetails } from "../validators/common-validator";
import { mapDocumentsToMembers, mapDocumentToMember } from "../mappers/member-mapper";
import AppError from "../errors/app-error";

const getMembers = async (page: number, size: number): Promise<Member[]> => {
  validatePaginationDetails(page, size);
  const memberDocs = await MemberModel
      .find({}, { firstName: 1, lastName: 1, gender: 1, email: 1, roles: 1 })
      .skip(page * size)
      .limit(size);

  return mapDocumentsToMembers(memberDocs);
}

const getSelf = async (loggedInMemberId: string): Promise<Member> => {
  return getAnyMember(loggedInMemberId);
}

const getMember = async (loggedInMemberId: string, memberId: string): Promise<Member> => {
  if (loggedInMemberId === memberId) {
      throw new AppError(`Access denied. Use self API to get yourself`, 400);
  }
  return getAnyMember(memberId);
}

const getAnyMember = async (memberId: string): Promise<Member> => {
  const memberDoc = await MemberModel.findById(memberId, { firstName: 1, lastName: 1, gender: 1, email: 1, roles: 1, __v: 1, createdAt: 1, updatedAt: 1 });
  if (memberDoc) {
      return mapDocumentToMember(memberDoc);
  } else {
      throw new AppError(`Member cannot be found for id: ${memberId}`, 400);
  }
}

export { getMembers, getSelf, getMember };