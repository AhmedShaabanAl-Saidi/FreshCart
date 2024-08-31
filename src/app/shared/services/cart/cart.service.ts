import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../base/Enviroment';
import { SuccessAddProduct } from '../../interfaces/success-add-product';
import { FailAddProduct } from '../../interfaces/fail-add-product';
import { CartResponse } from '../../interfaces/cart';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient,@Inject(PLATFORM_ID) private platformId:object) {}

  userTokenHeader = {
    token: isPlatformBrowser(this.platformId) ? localStorage.getItem('userToken') || '' : ''
  };
  
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

  getLoggedUserCart(): Observable<CartResponse> {
    return this._HttpClient.get<CartResponse>(
      `${Environment.baseUrl}/api/v1/cart`,
      {
        headers: this.userTokenHeader,
      }
    );
  }

  updateProductCartCount(
    productId: string,
    count: string
  ): Observable<CartResponse> {
    return this._HttpClient.put<CartResponse>(
      `${Environment.baseUrl}/api/v1/cart/${productId}`,
      { count: count },
      {
        headers: this.userTokenHeader,
      }
    );
  }

  removeProductFromCart(productId: string): Observable<CartResponse> {
    return this._HttpClient.delete<CartResponse>(
      `${Environment.baseUrl}/api/v1/cart/${productId}`,
      {
        headers: this.userTokenHeader,
      }
    );
  }

  clearCart(): Observable<CartResponse> {
    return this._HttpClient.delete<CartResponse>(
      `${Environment.baseUrl}/api/v1/cart/`,
      {
        headers: this.userTokenHeader,
      }
    );
  }
}
