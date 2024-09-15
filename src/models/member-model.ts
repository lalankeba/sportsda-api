import { model, Schema, Document, Types } from "mongoose";
import Role from "../enums/role";
import Gender from "../enums/gender";

const MAX_NAME_LENGTH = 20;
const MAX_EMAIL_LENGTH = 50;
const MAX_PASSWORD_LENGTH = 200;
const MAX_GENDER_LENGTH = 10;

interface MemberDocument extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Gender;
  roles: Role[];
}

const memberSchema = new Schema<MemberDocument>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
      minLength: [1, 'First name must be present.'],
      maxLength: [MAX_NAME_LENGTH, `First name must be less than ${MAX_NAME_LENGTH} characters.`],
      match: [/^[A-Za-z\s]+$/, 'First name must contain only letters and spaces.']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      minLength: [1, 'Last name must be present.'],
      maxLength: [MAX_NAME_LENGTH, `Last name must be less than ${MAX_NAME_LENGTH} characters`],
      match: [/^[A-Za-z\s]+$/, 'Last name must contain only letters and spaces.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      minLength: [4, 'Email must be present.'],
      maxLength: [MAX_EMAIL_LENGTH, `Email must be less than ${MAX_EMAIL_LENGTH} characters`]
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      maxLength: [MAX_PASSWORD_LENGTH, `Password must be less than ${MAX_PASSWORD_LENGTH} characters`]
    },
    gender: {
      type: String,
      required: [true, 'Gender is required.'],
      minLength: [1, 'Gender must be present.'],
      maxLength: [MAX_GENDER_LENGTH, `Gender must be less than ${MAX_GENDER_LENGTH} characters`],
      enum: Object.values(Gender),
    },
    roles: {
      type: [String],
      enum: Object.values(Role),
      default: [Role.Student]
    }
  },
  {
    timestamps: true,
  }
);

const MemberModel = model<MemberDocument>('Member', memberSchema);

export default MemberModel;
export { MemberDocument };
