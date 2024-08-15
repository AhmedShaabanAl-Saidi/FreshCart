export interface registerData extends logInData{
  name: string;
  rePassword: string;
  phone: string;
}

export interface logInData {
  email: string;
  password: string;
}
