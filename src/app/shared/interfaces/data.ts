export interface email {
  email: string;
}

export interface registerData extends logInData, email {
  name: string;
  rePassword: string;
  phone: string;
}

export interface logInData extends email {
  password: string;
}
