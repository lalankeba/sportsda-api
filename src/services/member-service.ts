import Member, { MemberFaculty } from "../interfaces/i-member";
import MemberModel, { MemberDocument } from "../models/member-model";
import { validateDocId, validatePaginationDetails } from "../validators/common-validator";
import { mapDocumentsToMembers, mapDocumentToMember } from "../mappers/member-mapper";
import AppError from "../errors/app-error";
import Gender from "../enums/gender";
import Role from "../enums/role";
import FacultyModel from "../models/faculty-model";

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

const updateSelf = async (loggedInMemberId: string, firstName: string, lastName: string, gender: Gender, facultyId: string, v: number): Promise<Member> => {
  const memberDoc: MemberDocument | null = await MemberModel.findById(loggedInMemberId);

  if (!memberDoc) {
    throw new AppError(`Cannot find the member. Unable to update member for id: ${loggedInMemberId}`, 400);
  }

  if (memberDoc.__v !== v) {
    throw new AppError(`Member has been modified by another process. Please refresh and try again.`, 409);
  }

  validateDocId(facultyId);
  const facultyDoc = await FacultyModel.findById(facultyId);
  if (!facultyDoc) {
    throw new AppError(`Cannot find the faculty. Faculty id ${facultyId} is invalid.`, 400);
  }

  const memberFaculty: MemberFaculty = {
    id: facultyDoc.id,
    name: facultyDoc.name
  }

  const updatedMemberDoc = await MemberModel.findByIdAndUpdate(
    loggedInMemberId,
    { $set: { firstName, lastName, gender, faculty: memberFaculty }, $inc: { __v: 1 } },
    { new: true }
  );
  
  if (!updatedMemberDoc) {
    throw new AppError('Failed to update member document.', 500);
  }

  return mapDocumentToMember(updatedMemberDoc);
}

const updateMember = async (loggedInMemberId: string, memberId: string, firstName: string, lastName: string, gender: Gender, roles: Role[], facultyId: string, v: number): Promise<Member> => {
  if (loggedInMemberId === memberId) {
      throw new AppError(`Access denied. Use self API to update yourself`, 401);
  }

  const memberDoc: MemberDocument | null = await MemberModel.findById(memberId);

  if (!memberDoc) {
      throw new AppError(`Cannot find the member. Unable to update member for id: ${memberId}`, 400);
  }

  if (memberDoc.__v !== v) {
      throw new AppError(`Member has been modified by another process. Please refresh and try again.`, 409);
  }

  validateDocId(facultyId);
  const facultyDoc = await FacultyModel.findById(facultyId);
  if (!facultyDoc) {
    throw new AppError(`Cannot find the faculty. Faculty id ${facultyId} is invalid.`, 400);
  }

  const memberFaculty: MemberFaculty = {
    id: facultyDoc.id,
    name: facultyDoc.name
  }

  const updatedMemberDoc = await MemberModel.findByIdAndUpdate(
    memberId,
    { $set: { firstName, lastName, gender, roles, faculty: memberFaculty }, $inc: { __v: 1 } },
    { new: true }
  );
  
  if (!updatedMemberDoc) {
      throw new AppError('Failed to update user document.', 500);
  }

  return mapDocumentToMember(updatedMemberDoc);
}

const getAnyMember = async (memberId: string): Promise<Member> => {
  const memberDoc = await MemberModel.findById(memberId, { firstName: 1, lastName: 1, gender: 1, email: 1, roles: 1, faculty: 1, __v: 1, createdAt: 1, updatedAt: 1 });
  if (memberDoc) {
      return mapDocumentToMember(memberDoc);
  } else {
      throw new AppError(`Member cannot be found for id: ${memberId}`, 400);
  }
}

export { getMembers, getSelf, getMember, updateSelf, updateMember };