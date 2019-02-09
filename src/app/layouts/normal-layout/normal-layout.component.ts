import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

declare var initializeVerticalLayout: any;

@Component({
  selector: 'app-normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: ['./normal-layout.component.css']
})
export class NormalLayoutComponent implements OnInit, AfterViewChecked {

  isUsedinitializeVerticalLayout = false;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.handleMenuUILoadingIssues();
  }

  handleMenuUILoadingIssues() {
    // load the js from ./assets/files/assets/js/vertical/vertical-layout.min.js

    if (!this.isUsedinitializeVerticalLayout) {
      initializeVerticalLayout();
      this.isUsedinitializeVerticalLayout = true;
    }
  }
}
