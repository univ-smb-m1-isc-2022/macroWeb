import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  formGroup!: FormGroup;

  constructor(private loginService : LoginService) { }

  onSubmit() {
    this.loginService.login("5@gmail.com", "123456789").then(
      data => {
        if (data != null) {
          let myData = JSON.parse(JSON.stringify(data));
          localStorage.setItem("token", myData.token);
          localStorage.setItem("email", myData.email);
        }

      }
    );
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
