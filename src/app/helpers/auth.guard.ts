import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private loginService : LoginService, ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.loginService.checkToken(localStorage.getItem("token")!).then(
      data => {
        if (data != null) {
          let myData = JSON.parse(JSON.stringify(data));
          if (myData.valid) {
            return true;
          }
          else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false
          }
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false
      }
    );
  }


}
