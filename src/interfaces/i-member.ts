import Gender from "../enums/gender";
import Role from "../enums/role";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
  v: number;
}

export default Member;