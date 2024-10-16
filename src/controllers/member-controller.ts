import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../utils/async-error-handler";
import * as memberService from "../services/member-service";
import { getAuth } from "@clerk/express";

const getMembers = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 0;
  const size = Math.min(parseInt(req.query.size as string) || 10, 100);
  const members = await memberService.getMembers(page, size);
  res.status(200).json(members);
});

const getSelf = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  const loggedInMemberId = userId as string;
  const member = await memberService.getSelf(loggedInMemberId);
  res.status(200).json(member);
});

const getMember = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  const loggedInUserId = userId as string;
  const memberId = req.params.id;
  const member = await memberService.getMember(loggedInUserId, memberId);
  res.status(200).json(member);
});

const updateSelf = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  const loggedInUserId = userId as string;
  const { gender, facultyId, v } = req.body;
  const updatedMember = await memberService.updateSelf(loggedInUserId, gender, facultyId, v);
  res.status(200).json(updatedMember);
});

const updateMember = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  const loggedInUserId = userId as string;
  const memberId = req.params.id;
  const { gender, facultyId, v } = req.body;
  const updatedMember = await memberService.updateMember(loggedInUserId, memberId, gender, facultyId, v);
  res.status(200).json(updatedMember);
});

export { getMembers, getSelf, getMember, updateSelf, updateMember };
