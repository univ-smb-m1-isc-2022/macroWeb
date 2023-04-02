import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) { }

  getFoodWithNameStartsWith(name: any): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/v1/food/startingWith?startingChar=' + name);
  }
}
