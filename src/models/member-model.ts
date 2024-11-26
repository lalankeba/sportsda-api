import { model, Schema, Document, Types } from "mongoose";
import Gender from "../enums/gender";
import Province from "../enums/province";
import { MemberFaculty } from "../interfaces/i-member";

const MAX_INDEX_NO_LENGTH = 10;
const MAX_GENDER_LENGTH = 10;
const MAX_PROVINCE_LENGTH = 25;
const MAX_SCHOOL_LENGTH = 60;

interface MemberDocument extends Document {
  _id: Types.ObjectId;
  userId: string;
  indexNo: string;
  gender: Gender;
  faculty: MemberFaculty;
  province: Province;
  school: string;
  createdAt: Date;
  updatedAt: Date;
}

const memberFacultySchema = new Schema(
  {
      id: { type: String, required: true, ref: 'Faculty' },
      name: { type: String, required: true }
  },
  { _id: false }
);

const memberSchema = new Schema<MemberDocument>(
  {
    userId: {
      type: String,
      required: [true, 'User id is required.'],
    },
    indexNo: {
      type: String,
      minLength: [6, 'Index number must be present.'],
      maxLength: [MAX_INDEX_NO_LENGTH, `Index number must be less than ${MAX_INDEX_NO_LENGTH} characters`],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required.'],
      minLength: [1, 'Gender must be present.'],
      maxLength: [MAX_GENDER_LENGTH, `Gender must be less than ${MAX_GENDER_LENGTH} characters`],
      enum: Object.values(Gender),
    },
    faculty: {
      type: memberFacultySchema,
      required: [true, 'Valid faculty is required.']
    },
    province: {
      type: String,
      required: [true, 'Province is required.'],
      minLength: [3, 'Province must be present.'],
      maxLength: [MAX_PROVINCE_LENGTH, `Province must be less than ${MAX_PROVINCE_LENGTH} characters`],
      enum: Object.values(Province),
    },
    school: {
      type: String,
      minLength: [4, 'School must be present.'],
      maxLength: [MAX_SCHOOL_LENGTH, `School name must be less than ${MAX_SCHOOL_LENGTH} characters`],
    },
  },
  {
    timestamps: true,
  }
);

const MemberModel = model<MemberDocument>('Member', memberSchema);

export default MemberModel;
export { MemberDocument };
