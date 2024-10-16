import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../utils/async-error-handler";
import * as facultyService from "../services/faculty-service";
import { clerkClient, getAuth } from "@clerk/express";

const getFaculties = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 0;
  const size = Math.min(parseInt(req.query.size as string) || 10, 100);
  const faculties = await facultyService.getFaculties(page, size);
  res.status(200).json(faculties);
});

const getFaculty = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  const user = await clerkClient.users.getUser(userId as string);
  
  const facultyId = req.params.id;
  const faculty = await facultyService.getFaculty(facultyId);
  res.status(200).json(faculty);
});

const addFaculty = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const addedFaculty = await facultyService.addFaculty(name);
  res.status(200).json(addedFaculty);
});

const updateFaculty = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const facultyId = req.params.id;
  const { name, v } = req.body;
  const updatedFaculty = await facultyService.updateFaculty(facultyId, name, v);
  res.status(200).json(updatedFaculty);
});

const deleteFaculty = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const facultyId = req.params.id;
  const deletedFaculty = await facultyService.deactivateFaculty(facultyId);
  res.status(200).json(deletedFaculty);
});

export { getFaculties, getFaculty, addFaculty, updateFaculty, deleteFaculty };