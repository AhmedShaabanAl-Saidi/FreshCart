import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerData } from '../../interfaces/data';
import { Environment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../interfaces/success-response';
import { FailResponse } from '../../interfaces/fail-response';

@Injectable({
 providedIn: 'root',
})
export class AuthService {
 constructor(private _HttpClient: HttpClient) {}

 signUp(data: registerData):Observable<SuccessResponse|FailResponse> {
   return this._HttpClient.post<SuccessResponse|FailResponse>(`${Environment.baseUrl}/api/v1/auth/signup`, data);
 }
}
