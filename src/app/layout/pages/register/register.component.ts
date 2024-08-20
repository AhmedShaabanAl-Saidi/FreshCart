import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errMsg!: string;
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
        ),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?:\+20|0)?1[0125]\d{8}$/),
      ]),
    },
    { validators: this.checkRePasswordMatch }
  );

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  checkRePasswordMatch(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      g.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  submitRegister() {
    if (this.registerForm.valid) {
      // connect api
      this.isLoading = true;
      this._AuthService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          // navigate home , login >> pro routing
          this.isLoading = false;
          this._Router.navigate(['/login']);
        },
        error: (err) => {
          // console.log(err);
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}
