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
    const token = localStorage.getItem("token");

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + token)
      });

      return next.handle(cloned).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
            }
          }
          return throwError( err );
        })
      );
    }
    else {
      return next.handle(req);
    }
  }
}

