import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { AuthorizationService } from './authorization.service';
import { CommonService } from './common.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    public router: Router,
    private commonService: CommonService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // validate role: next.firstChild.data.role
      return this.isValidUser();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // validate role: childRoute.data.role
    return this.isValidUser();
  }


  isValidUser() {
    if (!this.authenticationService.isLoggedIn()) {
      // window.location.href = this.commonService.getWebSiteUrl() + '/login';
       this.router.navigate(['/login']);
      return false;
    }

    // todo: check user authorization (if user has a suitable role)



    return true;
  }
}
