import { action } from 'typesafe-actions';
import { USER_AUTHENTICATE } from './actionTypes';
import { LoginInformation } from './types';

export const authenticate = (value: LoginInformation) =>
  action(USER_AUTHENTICATE, value);
