import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { product, ProductResponse } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) {}

  getAllProduct(): Observable<ProductResponse> {
    return this._HttpClient.get<ProductResponse>(
      `${Environment.baseUrl}/api/v1/products`
    );
  }

  getProductById(productId:string):Observable<{data:product}>
  {
    return this._HttpClient.get<{data:product}>(`${Environment.baseUrl}/api/v1/products/${productId}`)
  }
}
