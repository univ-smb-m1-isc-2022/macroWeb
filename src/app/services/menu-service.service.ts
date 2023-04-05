import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  constructor(private httpClient : HttpClient) { }

  //get request as observable
  getMenu() : Observable<Object> {
    return this.httpClient.get(environment.apiKey+ '/demo-controller');
  }

  getMenuWithFood(menuId : number) : Observable<any> {
    return this.httpClient.get(environment.apiKey+ '/menu_food/menu/' + menuId);
  }

  deleteMenuFoodWithId(relationId : number) : Observable<any> {
    return this.httpClient.delete(environment.apiKey+ '/menu_food/menu/' + relationId);
  }

  getMenuWithNameStartsWith(name : string) : Observable<any> {
    return this.httpClient.get(environment.apiKey+ '/menu/startingWith?startingChar=' + name);
  }

  addFoodToMenu(data :any) : Observable<any> {
    return this.httpClient.post(environment.apiKey+ '/menu_food', data);
  }

  addMenu(data :any) : Observable<any> {
    return this.httpClient.post(environment.apiKey+ '/menu', data);
  }



}
