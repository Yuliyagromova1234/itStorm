import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoriesType} from "../../../types/categories.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<CategoriesType[]>(environment.api + 'categories');
  }
}
