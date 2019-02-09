import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile-change-username',
  templateUrl: './profile-change-username.component.html',
  styleUrls: ['./profile-change-username.component.css']
})
export class ProfileChangeUsernameComponent implements OnInit {

  model: any = {};
  customErrorMessage = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private commonService: CommonService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }


  onSubmit() {
    this.customErrorMessage = null;


    this.http
      .post(this.commonService.urls.changeUsername + '?newUsername=' + this.model.newUsername, null)
      .subscribe(data => {
        this.authenticationService.logout();
          // this.router.navigate(['/dashboard']);

        // this.http
        // .get(this.commonService.urls.getuUserInformation)
        // .subscribe(userInfo => {
        //   this.authenticationService.saveUserInformation(userInfo);
        //  });
      }, error => {
        const errorMessages = this.commonService.addingErrors(error);
        this.customErrorMessage = errorMessages.join(', ');
      });
  }
}
