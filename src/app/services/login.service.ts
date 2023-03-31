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
    return this.httpClient.post<string>(`http://127.0.0.1:8080/api/v1/auth/authenticate`, body, requestOptions).toPromise();
  }

  /*
  register(username: string, password: string): Observable<string> {
    const body = { username: username, password: password };
    return this.http.post<string>(`${this.apiUrl}/register`, body);
  }
  */

  checkToken(token: string): Promise<boolean | undefined> {
    const body = {token: token};
    return this.httpClient.post<boolean>(`http://127.0.0.1:8080/api/v1/auth/check`, body, requestOptions).toPromise();
  }
}
