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
    console.log("valid")
    this.loginService.login("5@gmail.com", "123456789").subscribe(
      token => {
        console.log(token);
      }
    );
  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit2() {
    //print localstorage user
    console.log(localStorage.getItem('user'));
  }
}
