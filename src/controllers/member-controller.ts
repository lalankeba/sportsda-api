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

const getSelf = async (req: Request, res: Response, next: NextFunction) => {
  const loggedInMember = req.user as Member;
  const loggedInMemberId = loggedInMember.id;
  const member = await memberService.getSelf(loggedInMemberId);
  res.status(200).json(member);
}

const getMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const loggedInMember = req.user as Member;
      const loggedInMemberId = loggedInMember.id;
      const memberId = req.params.id;
      const member = await memberService.getMember(loggedInMemberId, memberId);
      res.status(200).json(member);
  } catch (err) {
      next(err);
  }
}

export { getMembers, getSelf, getMember };
