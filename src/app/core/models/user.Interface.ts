export class User {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
}


export class LoginRequest {
  email: string = "";
  password: string = "";
}

export class ForgetPasswordRequest {
  email: string = "";
}

export class ResetRequest {
  password: string = "";
  confirm_password: string = "";
}
