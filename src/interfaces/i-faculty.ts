import DocumentStatus from "../enums/document-status";

interface Faculty {
  id: string;
  name: string;
  status: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
  v: number;
}

export default Faculty;