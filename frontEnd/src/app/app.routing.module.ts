import { RouterModule, Routes } from "@angular/router"
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PopularComponent } from './popular/popular.component';
import { RecentComponent } from './recent/recent.component';
import { ProfileComponent } from './profile/profile.component'; 

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'popular',
    component: PopularComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:'recent',
    component:RecentComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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