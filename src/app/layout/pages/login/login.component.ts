import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errMsg!: string;
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  submitLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          
          if ('user' in res) {
            localStorage.setItem('userName', res.user?.name);
            localStorage.setItem('userState', res.user?.role);
            localStorage.setItem('userEmail', res.user?.email);
        }
          
          if ('token' in res) {
            localStorage.setItem('userToken', res.token);
            this._AuthService.deCodeUserData();
          }
          this.isLoading = false;
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}
