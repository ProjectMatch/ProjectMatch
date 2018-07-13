export interface RegisterState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  shouldRedirect: boolean;
  showErrorPwLength: boolean;
  showErrorDuplicateUsername: boolean;
  showErrorDuplicateEmail: boolean;
  disableSubmitBtn: boolean;
  showErrorAllInputRqd: boolean;
}
