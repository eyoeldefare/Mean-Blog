import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from './app.routing.module'
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PopularComponent } from './popular/popular.component';
import { RecentComponent } from './recent/recent.component';
import { AuthenticateService } from './service/authenticate.service';
import { BlogService} from './service/blog.service';
import { EmailService } from './service/email.service';
import { AuthGuard } from './authGuard/login.auth';
import { NotauthGuard } from './authGuard/logout.auth';
import { BlogComponent } from './blog/blog.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { WriteblogComponent } from './writeblog/writeblog.component';
 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PopularComponent,
    RecentComponent,
    BlogComponent,
    PagenotfoundComponent,
    WriteblogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [AuthenticateService, AuthGuard, NotauthGuard, BlogService,EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
