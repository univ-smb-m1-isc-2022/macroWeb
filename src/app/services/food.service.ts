import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FoodService {


  constructor(private httpClient: HttpClient) { }

  getFoodWithNameStartsWith(name: any): Observable<any> {
    return this.httpClient.get(environment.apiKey+ '/food/startingWith?startingChar=' + name);
  }

  getRecommendedFood(idFood: any): Observable<any> {
    return this.httpClient.get(environment.apiKey+ '/v1/menu_food/recommend/'+idFood);
  }

  getFoodWithId(idFood: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/v1/food/'+idFood);
  }
}
