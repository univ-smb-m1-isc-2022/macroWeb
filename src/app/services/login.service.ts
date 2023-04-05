import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthGuard} from "../helpers/auth.guard";

const headerDict = {
  'Content-Type': 'application/json',
}

const requestOptions = {
  headers: new HttpHeaders(headerDict),
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {



  formGroup: FormGroup;
  constructor(private httpClient: HttpClient) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  login(email: string, password: string): Promise<string | undefined> {

    const body = { email: email, password: password };
    return this.httpClient.post<string>(environment.apiKey+ `/auth/authenticate`, body, requestOptions).toPromise();
  }

  //do the same login request but with observable
  loginObs(data:any): Observable<string> {
    return this.httpClient.post<string>(environment.apiKey+ `/auth/authenticate`, data, requestOptions);
  }


  register(body : any): Observable<string> {
    return this.httpClient.post<string>(environment.apiKey+ `/auth/register`, body);
  }

  checkToken(token: string): Promise<boolean | undefined> {
    const body = {token: token};
    return this.httpClient.post<boolean>(environment.apiKey+ `/auth/check`, body, requestOptions).toPromise();
  }
}
