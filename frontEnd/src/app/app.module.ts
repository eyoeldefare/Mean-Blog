import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpModule} from "@angular/http";
import { AppRoutingModule } from './app.routing.module'
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PopularComponent } from './popular/popular.component';
import { RecentComponent } from './recent/recent.component';
import {AuthenticateService} from './service/authenticate.service'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PopularComponent,
    RecentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
    
  ],
  providers: [AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
