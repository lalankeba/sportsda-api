import { model, Schema, Document, Types } from "mongoose";
import DocumentStatus from "../enums/document-status";

const MAX_NAME_LENGTH = 50;

interface FacultyDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  status: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const facultySchema = new Schema<FacultyDocument>(
  {
    name: {
      type: String,
      required: [true, 'Faculty name is required.'],
      minLength: [1, 'Faculty name must be present.'],
      maxLength: [MAX_NAME_LENGTH, `Faculty name must be less than ${MAX_NAME_LENGTH} characters.`],
      match: [/^[A-Za-z\s]+$/, 'Faculty name must contain only letters and spaces.']
    },
    status: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.Active
    },
  },
  {
    timestamps: true,
  }
);

const FacultyModel = model<FacultyDocument>('Faculty', facultySchema);

export default FacultyModel;
export { FacultyDocument };
