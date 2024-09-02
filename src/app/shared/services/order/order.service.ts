import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { address } from '../../interfaces/data';
import { Environment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { FailCheckOut } from '../../interfaces/fail-check-out';
import { SuccessCheckOut } from '../../interfaces/success-check-out';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  userTokenHeader = {
    token: localStorage.getItem('userToken') || '',
  };

  constructor(private _HttpClient: HttpClient) {}

  checkOut(cardId: string, data: address) : Observable<SuccessCheckOut|FailCheckOut> {
    return this._HttpClient.post<SuccessCheckOut|FailCheckOut>(
      `${Environment.baseUrl}/api/v1/orders/checkout-session/${cardId}?url=${Environment.baseUrlWebSite}`,
      {
        shippingAddress: data,
      },
      {
        headers: this.userTokenHeader,
      }
    );
  }

  allOrders(userId: string) : Observable<any> {
    return this._HttpClient.get(
      `${Environment.baseUrl}/api/v1/orders/user/${userId}`
    );
  }
}