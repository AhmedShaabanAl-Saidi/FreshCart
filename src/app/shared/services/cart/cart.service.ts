import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Enviroment';
import { SuccessAddProduct } from '../../interfaces/success-add-product';
import { FailAddProduct } from '../../interfaces/fail-add-product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userTokenHeader = {
    token: localStorage.getItem('userToken') || '',
  };

  constructor(private _HttpClient: HttpClient) {}

  addProductToCart(
    productId: string
  ): Observable<SuccessAddProduct | FailAddProduct> {
    return this._HttpClient.post<SuccessAddProduct | FailAddProduct>(
      `${Environment.baseUrl}/api/v1/cart`,
      { productId: productId },
      {
        headers: this.userTokenHeader,
      }
    );
  }
}
