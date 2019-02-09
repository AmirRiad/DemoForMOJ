import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { Router } from '@angular/router';


declare var $: any;

@Injectable()
export class AuthenticationService {
  readonly tokenKey = 'tokenInfo';
  readonly userInfoKey = 'userInfo';

  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private router: Router ) { }

  // login(username: string, password: string) {
  //   this.http
  //     .get(this.commonService.urls.login, {
  //       params: {
  //         grant_type: 'password',
  //         username: username,
  //         password: password
  //       }
  //     })
  //     .subscribe(data => {
  //       this.saveTokenInformation(data);
  //       // todo: get user roles

  //       // this.router.navigate(['/']);
  //       window.location.href =  this.commonService.getWebSiteUrl();
  //     }, error => {
  //       // todo: show error
  //     });
  // }

  logout() {
    localStorage.clear();

    $('body > div.pace').removeClass('pace-inactive');
    $('body > div.pace .pace-progress').attr('data-progress-text', '50%');
    $('body > div.pace .pace-progress').css('transform', 'translate3d(50%, 0px, 0px)');

    window.location.href = this.commonService.getWebSiteUrl();
    // this.router.navigate(['/login']);
  }

  isLoggedIn() {
    const tokenInfo = this.getTokenInformation();

    // check if user has access token
    if (!tokenInfo || !tokenInfo.access_token) {
      return false;
    }

    // check if access token is expired
    const expireDate = tokenInfo['.expires'];
    if (!expireDate || new Date(new Date(expireDate).toUTCString()) < new Date(new Date().toUTCString())) {
      this.logout();
      return false;
    }

    return true;
  }

  saveUserInformation(userInfo) {
    localStorage.setItem('userInfoKey', JSON.stringify(userInfo));
  }

  getUserInformation() {
    let userInfo: any = {
      displayName: this.getTokenInformation() ? this.getTokenInformation().userName  : 'User name'
    };


    if (localStorage.getItem('userInfoKey')) {
      userInfo = JSON.parse(localStorage.getItem('userInfoKey'));
    }

    return userInfo;
  }

  saveTokenInformation(tokenInformation) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenInformation));
  }

  getTokenInformation() {
    const tokenInformationString = localStorage.getItem(this.tokenKey);
    return tokenInformationString ? JSON.parse(tokenInformationString) : null;
  }

  getToken() {
    const tokenInformation = this.getTokenInformation();
    return tokenInformation && tokenInformation.access_token ? tokenInformation.access_token : null;
  }

  hasRole(roleName: string) {
    let roles: string[] = [];

    const userInfo = this.getUserInformation();
    if (userInfo && userInfo.roles) {
      roles = userInfo.roles;
    }

    const hasRole = roles.findIndex(x => x.toLocaleLowerCase() === roleName.toLocaleLowerCase()) > -1;
    return hasRole;
  }
  checkUserType() {
     let userTypeId = 0;
     const userInfo = JSON.parse(localStorage.getItem('userInfoKey'));
     if (userInfo && userInfo.roles) {
      userTypeId = userInfo.userTypeId;
    }
     return userTypeId;
  }
}
