import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../../base/Enviroment';
import { SuccessAddProduct } from '../../interfaces/success-add-product';
import { FailAddProduct } from '../../interfaces/fail-add-product';
import { CartResponse } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient,@Inject(PLATFORM_ID) private platformId:object) {}
  
  addProductToCart(
    productId: string
  ): Observable<SuccessAddProduct | FailAddProduct> {
    return this._HttpClient.post<SuccessAddProduct | FailAddProduct>(
      `${Environment.baseUrl}/api/v1/cart`,
      { productId: productId }
    );
  }

  getLoggedUserCart(): Observable<CartResponse> {
    return this._HttpClient.get<CartResponse>(
      `${Environment.baseUrl}/api/v1/cart`
    );
  }

  updateProductCartCount(
    productId: string,
    count: string
  ): Observable<CartResponse> {
    return this._HttpClient.put<CartResponse>(
      `${Environment.baseUrl}/api/v1/cart/${productId}`,
      { count: count }
    );
  }

  removeProductFromCart(productId: string): Observable<CartResponse> {
    return this._HttpClient.delete<CartResponse>(
      `${Environment.baseUrl}/api/v1/cart/${productId}`
    );
  }

  clearCart(): Observable<CartResponse> {
    return this._HttpClient.delete<CartResponse>(
      `${Environment.baseUrl}/api/v1/cart/`
    );
  }
}
