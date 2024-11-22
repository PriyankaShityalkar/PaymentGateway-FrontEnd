import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http: HttpClient) { }

  public Order(data:any):Observable<any>
  {
    return this.http.post("http://localhost:9393/order/create-order", data);
  }
}
