import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { WeightComponent } from './components/weight/weight.component';
import {NgChartsModule} from "ng2-charts";
import { DailyComponent } from './components/daily/daily.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {menuChoiceComponent} from "./components/daily/menuDialog/menuChoice.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {CommonModule} from "@angular/common";
import {AddFoodComponent} from "./components/daily/foodDialog/addFood.component";
import {MatSelectModule} from "@angular/material/select";
import { FilterPipe } from './pipes/filter.pipe';
import { RegisterComponent } from './components/register/register.component';
import {
  FacebookLoginProvider,
  GoogleLoginProvider, GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WeightComponent,
    DailyComponent,
    menuChoiceComponent,
    AddFoodComponent,
    FilterPipe,
    RegisterComponent

  ],
  imports: [
    SocialLoginModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    GoogleSigninButtonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '390781954954-p7kcl2j8au3i5lv0clt2orphpqvlk7eu.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
