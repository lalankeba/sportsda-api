import Gender from "../enums/gender";
import Role from "../enums/role";

interface MemberFaculty {
  id: string;
  name: string;
}

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  roles: Role[];
  faculty: MemberFaculty;
  createdAt: Date;
  updatedAt: Date;
  v: number;
}

export default Member;
export { MemberFaculty };