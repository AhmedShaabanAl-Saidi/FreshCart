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
  successMsg!: string;

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(private _AuthService: AuthService) {}

  submitEmailForm() {
    if (this.emailForm.valid) {
      this.isLoading = true;
      this._AuthService.forgetPassword(this.emailForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.successMsg = res.message;
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
