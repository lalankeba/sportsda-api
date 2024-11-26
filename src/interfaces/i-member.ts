import Gender from "../enums/gender";
import Province from "../enums/province";

interface MemberFaculty {
  id: string;
  name: string;
}

interface Member {
  id: string;
  userId: string;
  indexNo: string;
  gender: Gender;
  faculty: MemberFaculty;
  province: Province;
  school: string;
  createdAt: Date;
  updatedAt: Date;
  v: number;
}

export default Member;
export { MemberFaculty };