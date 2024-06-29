import { UserRole } from '../../../store/user/types';

export interface SignUpPayload {
  username: string;
  password: string;
  role: UserRole;
  fullName: string;
}
