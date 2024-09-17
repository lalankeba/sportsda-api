import logger from "../config/logger-config";
import validatePassword from "../config/validate-password";
import AppError from "../errors/app-error";
import MemberModel from "../models/member-model";
import bcrypt from 'bcryptjs';
import jsonwebtoken, { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { mapDocumentToMember } from "../mappers/member-mapper";
import Member, { MemberFaculty } from "../interfaces/i-member";
import IJwtPayload from '../interfaces/i-jwt-payload';
import TokenDetails from "../interfaces/i-token-details";
import FacultyModel from "../models/faculty-model";
import { validateDocId } from "../validators/common-validator";

const register = async (firstName: string, lastName: string, email: string, password: string, gender: string, facultyId: string): Promise<Member> => {
  // validate password
  const passwordValidationResult: boolean | any[] = validatePassword(password);
  if (Array.isArray(passwordValidationResult) && passwordValidationResult.length !== 0) { // not a valid password
    throw new AppError(`Invalid password. ${passwordValidationResult[0].message}`, 400);
  }

  // check existing user
  const existingMemberDoc = await MemberModel.findOne({email: email});
  if (existingMemberDoc) {
      throw new AppError(`Existing member found for the email: ${email}`, 400);
  }

  // get attached faculty
  validateDocId(facultyId);
  const facultyDoc = await FacultyModel.findById(facultyId);
  if (!facultyDoc) {
    throw new AppError(`Cannot find the faculty. Faculty id ${facultyId} is invalid.`, 400);
  }

  const memberFaculty: MemberFaculty = {
    id: facultyDoc.id,
    name: facultyDoc.name
  }

  // get the hash of the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // save the member in the db
  const memberDocument = await MemberModel.create({ 
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      gender,
      faculty: memberFaculty
  });

  logger.info(`Member created for ${firstName} ${lastName}`);
  return mapDocumentToMember(memberDocument);
}

const login = async (email: string, password: string): Promise<TokenDetails> => {
  if (!email || !password) {
      throw new AppError('Credentials are required', 400);
  }

  const memberDoc = await MemberModel.findOne({ email: email });
  if (!memberDoc) { // no member found for the provided email
      throw new AppError('Credentials are invalid', 400);
  } else {
      const isMatch = await bcrypt.compare(password, memberDoc.password);
      if (isMatch) { // valid user
          const jwtPayload: IJwtPayload = {
              jwtid: uuidv4(), email: memberDoc.email, roles: memberDoc.roles
          };
          const JWT_SECRET = process.env.JWT_SECRET as string;
          const options: SignOptions = {
              algorithm: 'HS512', expiresIn: '1d'
          }
          const token = jsonwebtoken.sign( jwtPayload, JWT_SECRET, options );
          return { token };
      } else { // password does not match
          throw new AppError('Credentials are invalid', 400);
      }
  }
}

export { register, login };
