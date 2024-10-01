import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../utils/async-error-handler";
import * as memberService from "../services/member-service";
import Member from "../interfaces/i-member";

const getMembers = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 0;
  const size = Math.min(parseInt(req.query.size as string) || 10, 100);
  const members = await memberService.getMembers(page, size);
  res.status(200).json(members);
});

const getSelf = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const loggedInMember = req.user as Member;
  const loggedInMemberId = loggedInMember.id;
  const member = await memberService.getSelf(loggedInMemberId);
  res.status(200).json(member);
});

const getMember = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const loggedInMember = req.user as Member;
  const loggedInMemberId = loggedInMember.id;
  const memberId = req.params.id;
  const member = await memberService.getMember(loggedInMemberId, memberId);
  res.status(200).json(member);
});

const updateSelf = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const loggedInMember = req.user as Member;
  const loggedInMemberId = loggedInMember.id;
  const { firstName, lastName, gender, facultyId, v } = req.body;
  const updatedMember = await memberService.updateSelf(loggedInMemberId, firstName, lastName, gender, facultyId, v);
  res.status(200).json(updatedMember);
});

const updateMember = asyncErrorHandler( async (req: Request, res: Response, next: NextFunction) => {
  const loggedInMember = req.user as Member;
  const loggedInMemberId = loggedInMember.id;
  const memberId = req.params.id;
  const { firstName, lastName, gender, roles, v } = req.body;
  const updatedMember = await memberService.updateMember(loggedInMemberId, memberId, firstName, lastName, gender, roles, v);
  res.status(200).json(updatedMember);
});

export { getMembers, getSelf, getMember, updateSelf, updateMember };
