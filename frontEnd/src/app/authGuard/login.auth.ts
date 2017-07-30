import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthenticateService } from '../service/authenticate.service';

@Injectable()
export class AuthGuard implements CanActivate {
    redirectUrl:String;
    constructor(private authService: AuthenticateService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.loggedIn()) {
            return true
        }
        else {
            this.redirectUrl = state.url
            this.router.navigate(['/login'])
            return false
        }
    }

}
