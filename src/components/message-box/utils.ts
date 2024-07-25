import { EMessageRole } from 'src/store/dialog/types';
import avatar from '../../assets/avatar.png';
import patient from '../../assets/patient.png';

export const displayedRole = (role: EMessageRole) => {
  switch (role) {
    case EMessageRole.ASSISTANT:
      return 'Patient';
    case EMessageRole.USER:
      return 'Doctor';
    default:
      return 'System';
  }
};

export const avatarImg = (role: EMessageRole) =>
  role === EMessageRole.USER || role === EMessageRole.SYSTEM ? avatar : patient;
