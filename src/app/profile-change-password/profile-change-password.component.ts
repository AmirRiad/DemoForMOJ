import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.css']
})
export class ProfileChangePasswordComponent implements OnInit {

  model: any = {};
  customErrorMessage = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private commonService: CommonService) { }

  ngOnInit() {
  }


  onSubmit() {
    this.customErrorMessage = null;

    if (this.model.NewPassword !== this.model.ConfirmPassword) {
      this.customErrorMessage = 'The new password and confirmation password do not match.';
      return;
    }

    this.http
      .post(this.commonService.urls.changePassword, this.model)
      .subscribe(data => {
        this.router.navigate(['/dashboard']);
      }, error => {
        const errorMessages = this.commonService.addingErrors(error);
        this.customErrorMessage = errorMessages.join(', ');
      });
  }
}
