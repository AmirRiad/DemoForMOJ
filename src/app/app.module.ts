import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Router, Routes, UrlSerializer } from '@angular/router';
import { HttpModule } from '@angular/http';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { ValidationMessagesComponent } from './form-controls/validation-messages/validation-messages.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonService } from './services/common.service';

import { CustomPagerComponent } from './form-controls/custom-pager/custom-pager.component';
import { RegexValidationDirective } from './form-controls/regex-validation.directive';


// import { NormalLayoutComponent } from './layouts/normal-layout/normal-layout.component';
import { NormalLayoutComponent } from './layouts/normal-layout/normal-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { AuthorizationService } from './services/authorization.service';

import { PatientsComponent } from './patients/patients.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';



import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { LowerCaseUrlSerializer } from './services/lowercase-urlserializaer';

import { ManageUserRolesComponent } from './manage-user-roles/manage-user-roles.component';


import { ProfileChangePasswordComponent } from './profile-change-password/profile-change-password.component';
import { ProfileChangeUsernameComponent } from './profile-change-username/profile-change-username.component';



const appRoutes: Routes = [
  {
    path: '', redirectTo: '/patient', pathMatch: 'full'
  },
  {
    path: 'home', redirectTo: '/patient'
  },
  {
    path: 'home/index', redirectTo: '/patient'
  },
  {
    path: '',
    component: NormalLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        data: { text: 'Profile', role: '' },
        children: [
          { path: 'change-password', component: ProfileChangePasswordComponent, data: { text: 'Change Password', role: '' } },
          { path: 'change-username', component: ProfileChangeUsernameComponent, data: { text: 'Change Username', role: '' } },
        ]
      },
      {
        path: 'patient',
        data: { text: 'Patients', role: 'feature_patients' },
        children: [
          { path: '', component: PatientsComponent, data: { text: 'List', role: 'feature_patients' }  },
          { path: 'add', component: PatientsFormComponent, data: { text: 'Add', role: 'feature_patients' } },
          { path: 'edit/:id', component: PatientsFormComponent, data: { text: 'Edit', role: 'feature_patients' }  },
        ]
      },
      {
        path: 'manae-userg-roles',
        component: ManageUserRolesComponent,
        data: { text: 'Manage User Roles', role: 'feature_manage-user-roles' }
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }

];

@NgModule({
  declarations: [
    AppComponent,
    NormalLayoutComponent,
    LoginLayoutComponent,
    LoginComponent,
    CustomPagerComponent,
    RegexValidationDirective,
    ValidationMessagesComponent,
    PatientsComponent,
    PatientsFormComponent,
    BreadcrumbsComponent,
    ManageUserRolesComponent,
    ProfileChangePasswordComponent,

    ProfileChangeUsernameComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CommonService,
    AuthGuard,
    AuthenticationService,
    AuthorizationService,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
