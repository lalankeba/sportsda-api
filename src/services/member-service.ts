import Member, { MemberFaculty } from "../interfaces/i-member";
import MemberModel, { MemberDocument } from "../models/member-model";
import { validateDocId, validatePaginationDetails } from "../validators/common-validator";
import { mapDocumentsToMembers, mapDocumentToMember } from "../mappers/member-mapper";
import AppError from "../errors/app-error";
import Gender from "../enums/gender";
import FacultyModel from "../models/faculty-model";
import Province from "../enums/province";

const getMembers = async (page: number, size: number): Promise<Member[]> => {
  validatePaginationDetails(page, size);
  const memberDocs = await MemberModel
    .find({}, { userId: 1, gender: 1 })
    .skip(page * size)
    .limit(size);

  return mapDocumentsToMembers(memberDocs);
}

const getSelf = async (loggedInMemberId: string): Promise<Member> => {
  return getAnyMember(loggedInMemberId);
}

const getMember = async (loggedInUserId: string, memberId: string): Promise<Member> => {
  if (loggedInUserId === memberId) {
    throw new AppError(`Access denied. Use self API to get yourself`, 400);
  }
  return getAnyMember(memberId);
}

const updateSelf = async (loggedInUserId: string, indexNo: string, gender: Gender, facultyId: string, province: Province, school: string, v: number): Promise<Member> => {
  const memberDoc: MemberDocument | null = await MemberModel.findOne({ userId: loggedInUserId });

  validateDocId(facultyId);
  const facultyDoc = await FacultyModel.findById(facultyId);
  if (!facultyDoc) {
    throw new AppError(`Cannot find the faculty. Faculty id ${facultyId} is invalid.`, 400);
  }

  const memberFaculty: MemberFaculty = {
    id: facultyDoc.id,
    name: facultyDoc.name
  }

  let updatedMemberDoc;
  if (!memberDoc) { // first time profile update
    updatedMemberDoc = await MemberModel.create({
      userId: loggedInUserId,
      indexNo,
      gender,
      faculty: memberFaculty,
      province,
      school
    });

  } else { // update after created member in our db
    if (memberDoc.__v !== v) {
      throw new AppError(`Member has been modified by another process. Please refresh and try again.`, 409);
    }

    updatedMemberDoc = await MemberModel.findOneAndUpdate(
      { userId: loggedInUserId },
      { $set: { indexNo, gender, faculty: memberFaculty, province, school }, $inc: { __v: 1 } },
      { new: true }
    );
    
    if (!updatedMemberDoc) {
      throw new AppError('Failed to update member document.', 500);
    }
  }
  return mapDocumentToMember(updatedMemberDoc);
}

const updateMember = async (loggedInUserId: string, userId: string, gender: Gender, facultyId: string, v: number): Promise<Member> => {
  if (loggedInUserId === userId) {
      throw new AppError(`Access denied. Use self API to update yourself`, 401);
  }

  const memberDoc: MemberDocument | null = await MemberModel.findOne({ userId });

  if (!memberDoc) {
      throw new AppError(`Cannot find the member. Unable to update member for id: ${userId}`, 400);
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

  const updatedMemberDoc = await MemberModel.findOneAndUpdate(
    { userId },
    { $set: { gender, faculty: memberFaculty }, $inc: { __v: 1 } },
    { new: true }
  );
  
  if (!updatedMemberDoc) {
      throw new AppError('Failed to update user document.', 500);
  }

  return mapDocumentToMember(updatedMemberDoc);
}

const getAnyMember = async (userId: string): Promise<Member> => {
  const memberDoc = await MemberModel.findOne({userId}, { userId: 1, indexNo: 1, gender: 1, faculty: 1, province: 1, school: 1, __v: 1, createdAt: 1, updatedAt: 1 });
  if (memberDoc) {
      return mapDocumentToMember(memberDoc);
  } else {
      throw new AppError(`Member cannot be found for id: ${userId}`, 400);
  }
}

export { getMembers, getSelf, getMember, updateSelf, updateMember };