import { UserRole } from "src/store/user/types";

export interface SignUpPayload {
  username: string;
  password: string;
  role: UserRole;
  fullName: string;
}
