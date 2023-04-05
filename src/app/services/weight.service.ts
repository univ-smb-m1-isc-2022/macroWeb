import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  constructor(private httpClient:HttpClient) { }

  getWeightWithId(id : any) : Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/v1/weight/' + id);
  }

  addWeight(data : any) : Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/weight', data);
  }
}
