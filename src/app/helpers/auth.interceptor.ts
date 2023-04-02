import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            // Unauthorized error
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      );
    } else {
      const error = new Error('Token not found');
      this.router.navigate(['/login']);
      return throwError(error);
    }
  }
}

