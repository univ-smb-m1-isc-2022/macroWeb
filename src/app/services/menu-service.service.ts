import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  constructor(private httpClient : HttpClient) { }

  //get request as observable
  getMenu() : Observable<Object> {
    return this.httpClient.get('http://localhost:8080/api/v1/demo-controller');
  }

  getMenuWithFood(menuId : number) : Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/v1/menu_food/menu/' + menuId);
  }

  deleteMenuFoodWithId(relationId : number) : Observable<any> {
    return this.httpClient.delete('http://localhost:8080/api/v1/menu_food/menu/' + relationId);
  }

  getMenuWithNameStartsWith(name : string) : Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/v1/menu/startingWith?startingChar=' + name);
  }

  addFoodToMenu(data :any) : Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/menu_food', data);
  }

  addMenu(data :any) : Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/menu', data);
  }



}
