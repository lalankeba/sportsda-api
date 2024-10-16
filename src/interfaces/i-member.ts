import Gender from "../enums/gender";
import Role from "../enums/role";

interface MemberFaculty {
  id: string;
  name: string;
}

interface Member {
  id: string;
  userId: string;
  gender: Gender;
  faculty: MemberFaculty;
  createdAt: Date;
  updatedAt: Date;
  v: number;
}

export default Member;
export { MemberFaculty };