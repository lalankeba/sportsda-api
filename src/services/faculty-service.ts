import Faculty from "../interfaces/i-faculty";
import { validatePaginationDetails } from "../validators/common-validator";
import FacultyModel from "../models/faculty-model";
import { mapDocumentsToFaculties, mapDocumentToFaculty } from "../mappers/faculty-mapper";
import AppError from "../errors/app-error";
import logger from "../config/logger-config";
import DocumentStatus from "../enums/document-status";

const getFaculties = async (page: number, size: number): Promise<Faculty[]> => {
  validatePaginationDetails(page, size);
  const facultyDocs = await FacultyModel
    .find({status: DocumentStatus.Active}, { name: 1, status: 1})
    .skip(page * size)
    .limit(size);

  logger.info(facultyDocs);

  return mapDocumentsToFaculties(facultyDocs);
}

const getFaculty = async (facultyId: string): Promise<Faculty> => {
  const facultyDoc = await FacultyModel.findById(facultyId, { name: 1, status: 1, __v: 1, createdAt: 1, updatedAt: 1 });
  if (facultyDoc) {
      return mapDocumentToFaculty(facultyDoc);
  } else {
    throw new AppError(`Faculty cannot be found for id: ${facultyId}`, 400);
  }
}

const addFaculty = async (name: string): Promise<Faculty> => {
  const existingFacultyDoc = await FacultyModel.findOne({name: name, status: DocumentStatus.Active});
  if (existingFacultyDoc) {
      throw new AppError(`Existing faculty found for the name: ${name}`, 400);
  }

  const facultyDoc = await FacultyModel.create({ 
    name: name.trim()
  });
  logger.info(`Faculty created for ${name}`);
  return mapDocumentToFaculty(facultyDoc);
}

const updateFaculty = async (facultyId: string, name: string, v: number): Promise<Faculty> => {
  const existingFacultyDoc = await FacultyModel.findById(facultyId);
  if (!existingFacultyDoc) {
      throw new AppError(`Cannot find the faculty. Unable to update faculty for id: ${facultyId}`, 400);
  }
  if (existingFacultyDoc.__v !== v) {
    throw new AppError(`Faculty has been modified by another process. Please refresh and try again.`, 409);
  }

  const updatedFacultyDoc = await FacultyModel.findByIdAndUpdate(
    facultyId,
    { $set: { name }, $inc: { __v: 1 } },
    { new: true }
  );

  if (!updatedFacultyDoc) {
      throw new AppError('Failed to update faculty document.', 500);
  }

  return mapDocumentToFaculty(updatedFacultyDoc);
}

const deactivateFaculty = async (facultyId: string): Promise<Faculty> => {
  const facultyDoc = await FacultyModel.findById(facultyId);
  if (!facultyDoc) {
    throw new AppError(`Cannot find the faculty. Unable to deactivate the faculty for id: ${facultyId}`, 400);
  }

  const updatedFacultyDoc = await FacultyModel.findByIdAndUpdate(
    facultyId,
    { $set: { status: DocumentStatus.Inactive }, $inc: { __v: 1 } },
    { new: true }
  );
  if (!updatedFacultyDoc) {
    throw new AppError('Failed to deactivate faculty document.', 500);
  }

  return mapDocumentToFaculty(updatedFacultyDoc);
}

export { getFaculties, getFaculty, addFaculty, updateFaculty, deactivateFaculty };
