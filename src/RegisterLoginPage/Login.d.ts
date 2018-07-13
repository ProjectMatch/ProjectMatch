import { Dispatch } from 'react-redux';

export interface LoginState {
  email: string;
  password: string;
  showError: boolean;
}
