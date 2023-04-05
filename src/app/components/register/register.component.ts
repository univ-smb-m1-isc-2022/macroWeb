import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from "../../services/login.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userData$!: Observable<any>;
  registerForm!: FormGroup;

  objectives = ['Maintenir Poids', 'Perte Gras', 'Prise de Masse'];

  constructor(private fb: FormBuilder, private loginService: LoginService, private router:Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      objective: ['', [Validators.required]],
      height: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log('Invalid form')
      return;
    }
    let TransformedObjective;
    if (this.registerForm.value.objective == 'Maintenir Poids') {
      TransformedObjective = 'MAINTAIN_WEIGHT'
    }
    if (this.registerForm.value.objective == 'Perte Gras') {
      TransformedObjective = 'LOSE_FAT'
    }
    if (this.registerForm.value.objective == 'Prise de Muscle') {
      TransformedObjective = 'GAIN_MUSCLE'
    }
    let body = {
      "firstname": this.registerForm.value.firstName,
      "lastname": this.registerForm.value.lastName,
      "email": this.registerForm.value.email,
      "password": this.registerForm.value.password,
      "objective": TransformedObjective,
      "size": this.registerForm.value.height
    }
    console.log(this.registerForm.value);
    this.userData$ = this.loginService.register(body);
    this.userData$.subscribe(data => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("id", data.id);
        localStorage.setItem("size", data.size);
        localStorage.setItem("objective", data.objective);
      this.router.navigate(['home']);
      }
    )
  }

}
