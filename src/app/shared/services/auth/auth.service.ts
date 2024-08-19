import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { logInData, registerData } from '../../interfaces/data';
import { Environment } from '../../../base/Enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { SuccessResponse } from '../../interfaces/success-response';
import { FailResponse } from '../../interfaces/fail-response';
import { jwtDecode } from 'jwt-decode';
import { userDataDecoded } from '../../interfaces/userDataDecoded';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * behaver subject
   * sub
   * next()
   * getValue()
   */
  // userData!: userDataDecoded | null;
  userData: BehaviorSubject<userDataDecoded | null> =
    new BehaviorSubject<userDataDecoded | null>(null);

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    @Inject(PLATFORM_ID) id: object
  ) {
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('userToken')) {
        this.deCodeUserData();
        _Router.navigate([localStorage.getItem('currentPage')]);
      }
    }
  }

  signUp(data: registerData): Observable<SuccessResponse | FailResponse> {
    return this._HttpClient.post<SuccessResponse | FailResponse>(
      `${Environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  signIn(data: logInData): Observable<SuccessResponse | FailResponse> {
    return this._HttpClient.post<SuccessResponse | FailResponse>(
      `${Environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  deCodeUserData() {
    // decode token
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decoded = jwtDecode(token);
    this.userData.next(decoded);

    console.log(this.userData.getValue());
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}