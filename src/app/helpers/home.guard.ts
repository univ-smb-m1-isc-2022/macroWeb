import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class homeGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService : LoginService, ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem("token") == null) {
      return true;
    }
    return this.loginService.checkToken(localStorage.getItem("token")!).then(
      data => {
        if (data != null) {
          let myData = JSON.parse(JSON.stringify(data));
          if (myData.valid) {
            this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
            return true;
          }
        }
        return false
      }
    );
  }


}
