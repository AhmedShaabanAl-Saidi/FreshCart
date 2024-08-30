import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Enviroment';
import { BrandsResponse } from '../../interfaces/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient: HttpClient) { }

  getAllBrands(): Observable<BrandsResponse> {
    return this._HttpClient.get<BrandsResponse>(
      `${Environment.baseUrl}/api/v1/brands`
    );
  }
}
