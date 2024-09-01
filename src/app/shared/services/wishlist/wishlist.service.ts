import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Enviroment';
import { WishlistResponse } from '../../interfaces/wishlist';
import { SuccessAddProduct } from '../../interfaces/success-add-product';
import { SuccessRemoveProduct } from '../../interfaces/success-remove-product';
import { SuccessAddProductToWishlist } from '../../interfaces/success-add-product-to-wishlist';
import { FailAddProductToWishlist } from '../../interfaces/fail-add-product-to-wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient,@Inject(PLATFORM_ID) private platformId:object) {}

  userTokenHeader = {
    token: isPlatformBrowser(this.platformId) ? localStorage.getItem('userToken') || '' : ''
  };

  getLoggedUserWishlist(): Observable<WishlistResponse> {
    return this._HttpClient.get<WishlistResponse>(
      `${Environment.baseUrl}/api/v1/wishlist`,
      {
        headers: this.userTokenHeader,
      }
    );
  }

  removeProductFromCart(productId: string): Observable<SuccessAddProduct|SuccessRemoveProduct> {
    return this._HttpClient.delete<SuccessAddProduct|SuccessRemoveProduct>(
      `${Environment.baseUrl}/api/v1/wishlist/${productId}`,
      {
        headers: this.userTokenHeader,
      }
    );
  }

  addProductToWishlist(
    productId: string
  ): Observable<SuccessAddProductToWishlist | FailAddProductToWishlist> {
    return this._HttpClient.post<SuccessAddProductToWishlist | FailAddProductToWishlist>(
      `${Environment.baseUrl}/api/v1/wishlist`,
      { productId: productId },
      {
        headers: this.userTokenHeader,
      }
    );
  }
}
