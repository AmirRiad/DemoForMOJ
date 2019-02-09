import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  isValidCredentials = true;

  constructor(
    private commonService: CommonService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
  }

  login() {
    this.isValidCredentials = true;

    $('body > div.pace').removeClass('pace-inactive');
    $('body > div.pace .pace-progress').attr('data-progress-text', '50%');
    $('body > div.pace .pace-progress').css('transform', 'translate3d(50%, 0px, 0px)');

    this.http
    .post(this.commonService.urls.login, 'grant_type=password&username=' + this.model.username + '&password=' + this.model.password, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .subscribe(tokenInfo => {
      // localStorage.setItem(this.authenticationService.tokenKey, JSON.stringify(data));
      this.authenticationService.saveTokenInformation(tokenInfo);

      this.http
        .get(this.commonService.urls.getuUserInformation)
        .subscribe(userInfo => {
          this.authenticationService.saveUserInformation(userInfo);
          // window.location.href = this.commonService.getWebSiteUrl();
          this.router.navigate(['/patient']);
      });

      // this.router.navigateByUrl('/');
    }, error => {
      // todo: show error
      $('body > div.pace').addClass('pace-inactive');
      this.isValidCredentials = false;
      console.log(error);
    });
  }
}
