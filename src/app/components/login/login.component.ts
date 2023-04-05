import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  userData$!: Observable<any>;
  user: any;
  loggedIn: any;
  constructor(private authService:SocialAuthService, private fb: FormBuilder,private loginService : LoginService, private router: Router) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Invalid form')
      return;
    }
    this.userData$ = this.loginService.loginObs({"email": this.loginForm.value.email, password: this.loginForm.value.password})


    this.userData$.subscribe(data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("id", data.id);
      localStorage.setItem("objective", data.objective);
      localStorage.setItem("size", data.size);
      this.router.navigate(['/']);
    })

    console.log(this.userData$)
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user)
      this.loggedIn = (user != null);
    });
  }

}
