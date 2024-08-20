export interface email {
  email: string;
}

export interface code {
  resetCode: string;
}

export interface newPassword extends email {
  newPassword: string;
}

export interface registerData extends logInData, email {
  name: string;
  rePassword: string;
  phone: string;
}

export interface logInData extends email {
  password: string;
}
