import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm:FormGroup = new FormGroup({
    name : new FormControl(null, [Validators.required ,Validators.minLength(3),Validators.maxLength(8)]),
    email : new FormControl(null,[Validators.required , Validators.email]),
    password : new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)]),
    rePassword : new FormControl(null,[Validators.required]),
    phone : new FormControl(null,[Validators.required,Validators.pattern(/^(?:\+20|0)?1[0125]\d{8}$/)]),
  },{validators:this.checkRePasswordMatch})

  checkRePasswordMatch(g:AbstractControl)
  {
    if(g.get('password')?.value === g.get('rePassword')?.value)
    {
      return null;
    }
    else{
      g.get('rePassword')?.setErrors({mismatch:true})
      return {mismatch:true};
    }
  }

  submitRegister(){
    console.log(this.registerForm);
  }
}
