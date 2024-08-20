import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  isLoading: boolean = false;
  errMsg!: string;
  emailFormFlag: boolean = true;
  codeFormFlag: boolean = false;

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{4,}$/),
    ]),
  });

  constructor(private _AuthService: AuthService) {}

  submitEmailForm() {
    if (this.emailForm.valid) {
      this.isLoading = true;
      this._AuthService.forgetPassword(this.emailForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.emailFormFlag = false;
          this.codeFormFlag = true;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }

  submitCodeForm() {
    if (this.codeForm.valid) {
      this.isLoading = true;
      this._AuthService.verifyResetCode(this.codeForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}
