import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  formGroup!: FormGroup;
  userData$!: Observable<any>;

  constructor(private loginService : LoginService) { }

  onSubmit() {
    this.userData$ = this.loginService.loginObs({"email": "5@gmail.com", password: 12356789})



    this.userData$.subscribe(data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
    })

    console.log(this.userData$)


    /*
    if (this.formGroup.invalid) {
      this.loginService.login("5@gmail.com", "123456789").then(
        data => {
          if (data != null) {
            console.log(data[0]);
          }
        });
    }*/



  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit2() {
    //print localstorage user
    console.log(localStorage.getItem("email"));
    console.log(localStorage.getItem("token"));

  }
}
