import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./helpers/auth.guard";
import {homeGuard} from "./helpers/home.guard";
import {WeightComponent} from "./components/weight/weight.component";
import {DailyComponent} from "./components/daily/daily.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [homeGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path : 'weight', component: WeightComponent, canActivate: [AuthGuard]},
  { path : 'daily', component : DailyComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
