import { RouterModule, Routes } from "@angular/router"
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PopularComponent } from './popular/popular.component';
import { RecentComponent } from './recent/recent.component';
import { AuthGuard } from './authGuard/login.auth'
import { NotauthGuard } from './authGuard/logout.auth'
import { BlogComponent } from './blog/blog.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotauthGuard]


  },
  {
    path:'blog',
    component:BlogComponent,
    canActivate: [AuthGuard]


  },
  {
    path: 'popular',
    component: PopularComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'recent',
    component: RecentComponent
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotauthGuard]
  },
    {
    path:"**",
    component: PagenotfoundComponent
  }

]
@NgModule({

  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule {

}