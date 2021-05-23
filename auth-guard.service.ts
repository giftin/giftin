import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthGuardService implements CanActivate {
    authenticationService: any;

    constructor(private router: Router, private authService: AuthenticationService) {

    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree {

        if (!this.authenticationService.currentUserValue) {
           // alert('You are not allowed to view this page. You are redirected to login Page');

            this.router.navigate(["login"]);
            return false;

            //var urlTree = this.router.createUrlTree(['login']);
            //return urlTree;
        }

        return true;
    }

}