import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {RequestOrderType} from "../../../types/request-order.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  request(data: RequestOrderType) {
    return this.http.post<RequestOrderType>(environment.api + 'requests', data);
  }

}
