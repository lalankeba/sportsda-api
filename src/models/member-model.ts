import { model, Schema, Document, Types } from "mongoose";
import Gender from "../enums/gender";
import { MemberFaculty } from "../interfaces/i-member";

const MAX_GENDER_LENGTH = 10;

interface MemberDocument extends Document {
  _id: Types.ObjectId;
  userId: string;
  gender: Gender;
  faculty: MemberFaculty;
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
    }
  },
  {
    timestamps: true,
  }
);

const MemberModel = model<MemberDocument>('Member', memberSchema);

export default MemberModel;
export { MemberDocument };
