import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Enviroment';
import { CategoryResponse } from '../../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CatgeoryService {
  constructor(private _HttpClient: HttpClient) {}

  getAllCategories(): Observable<CategoryResponse> {
    return this._HttpClient.get<CategoryResponse>(
      `${Environment.baseUrl}/api/v1/categories`
    );
  }

  getAllSubCategories(catgeoryId:string): Observable<CategoryResponse> {
    return this._HttpClient.get<CategoryResponse>(
      `${Environment.baseUrl}/api/v1/categories/${catgeoryId}/subcategories`
    );
  }
}
