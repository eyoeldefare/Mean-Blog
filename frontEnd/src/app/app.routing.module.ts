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
import { WriteblogComponent } from './writeblog/writeblog.component';
import { SearchComponent } from "./search/search.component";

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotauthGuard]


  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotauthGuard]
  },

  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuard]


  },
  {
    path:"search/:title",
    component: SearchComponent
  },

  {
    path: 'recent',
    component: RecentComponent
  },

  {
    path: 'popular',
    component: PopularComponent
  },
  {
    path: "blog/:id",
    component: WriteblogComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  
  {
    path: "**",
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