import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
declare var $: any;

@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.css']
})
export class ManageUserRolesComponent implements OnInit  {

  users: any = [];
  roles: any = [];
  model: any;
  selectedUserName = '';

  isInitialized = false;

  susccessMessage: string;
  failureMessage: string;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  ngOnInit() {
    this.getData();
  }

  refreshUserRolesControl() {
    setTimeout(function() {
       // $('#user-roles-control').multiSelect('refresh');

       $('#user-roles-control').multiSelect({
        selectableHeader: '<div class="custom-header">Avialable Roles</div>',
        selectionHeader: '<div class="custom-header">Selected Roles</div>',
        });

    }, 50);
  }

  getSelectedRoles() {
    return $('#user-roles-control').val();
  }


  hasRole(role: string) {
    const isHasRole = this.model.roles.findIndex(x => x.toLocaleLowerCase() === role.toLocaleLowerCase()) > -1;
    return isHasRole;
  }





  getData() {
    this.http
      .get(this.commonService.urls.getUsersAndRoles)
      .subscribe((data: any) => {
        this.users = data.users;
        this.roles = data.roles;
      }, error => {
        console.log(error.message);
      });
  }


  getUserRoles(userName: string) {
    this.model = null;
    this.failureMessage = null;
    this.susccessMessage = null;
    // $('#user-roles-control').multiSelect('deselect_all');
    // $('#user-roles-control').multiSelect('destroy');

    if (!userName) {
      return;
    }

    this.http
      .get(this.commonService.urls.getuSpecificUserInformation, {
        params: {
          userName: userName
        }
      })
      .subscribe(data => {
        this.model = data;
        this.refreshUserRolesControl();
      }, error => {
        console.log(error.message);
      });
  }

  updateUserRoles() {
    const roles = this.getSelectedRoles();

    this.http
      .put(this.commonService.urls.updateUserRoles, roles, {
        params: {
          userName: this.model.userName
        }
      })
      .subscribe(data => {
        this.susccessMessage = 'Changes saved successfully';
        this.model = null;
        this.selectedUserName = '';
      }, error => {
        this.failureMessage = 'Couldn\'t save changes';
        console.log(error.message);
      });
  }

  onSubmit() {
    this.updateUserRoles();
  }
}
