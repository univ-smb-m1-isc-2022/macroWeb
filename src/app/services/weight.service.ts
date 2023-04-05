import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  constructor(private httpClient:HttpClient) { }

  getWeightWithId(id : any) : Observable<any> {
    return this.httpClient.get(environment.apiKey+ '/weight/' + id);
  }

  addWeight(data : any) : Observable<any> {
    return this.httpClient.post(environment.apiKey+ '/weight', data);
  }
}
