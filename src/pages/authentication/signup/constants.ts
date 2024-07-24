import { UserRole } from 'src/store/user/types';
import { SignUpPayload } from './types';

export const signUpInitialValues: SignUpPayload = {
  username: '',
  password: '',
  role: UserRole.STUDENT,
  fullName: '',
};

export const roleOptions = [
  { label: 'Student', key: UserRole.STUDENT },
  { label: 'Supervisor', key: UserRole.SUPERVISOR },
];
