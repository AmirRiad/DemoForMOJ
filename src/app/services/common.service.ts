import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  constructor() {}

      //baseUrl = 'http://localhost:6615'; // devvelopment mode
      baseUrl = ''; // production mode

  hostUrl = this.baseUrl + '/api/';


  urls = {
    hostUrl: this.hostUrl,
    login: this.baseUrl + '/token',
    getuUserInformation: this.hostUrl + 'User/GetUserInformation',
    getuSpecificUserInformation: this.hostUrl + 'User/GetSpecificUserInformation',
    updateUserRoles: this.hostUrl + 'User/UpdateUserRoles',
    getUsersAndRoles: this.hostUrl + 'User/GetUsersAndRoles',
    patients: this.hostUrl + 'patient',
    changePassword: this.hostUrl + 'Account/ChangePassword',
    changeUsername: this.hostUrl + 'Account/ChangeUsername',
  };

  addingErrors(error) {
    const errors = new Array();
    const modelState = error.error.ModelState;
    for (const property in modelState) {
      if (modelState.hasOwnProperty(property)) {
        if (property && property.trim().length > 0) {
          errors.push(property + ': ' + modelState[property][0]);
        } else {
          errors.push(modelState[property][0]);
        }
      }
    }

    return errors;
  }

  getWebSiteUrl() {
    let url = window.location.protocol + '//' + window.location.hostname;
    if (window.location.port) {
      url += ':' + window.location.port;
    }
    return url ;
  }

}
