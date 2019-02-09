import { Component, OnInit, AfterViewChecked } from '@angular/core';

declare var initializeVerticalLayout: any;
declare var $: any;

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit, AfterViewChecked {

  isUsedinitializeVerticalLayout = false;


  constructor() { }

  ngOnInit() {
    $('body').attr('themebg-pattern', 'theme1');
  }

  ngAfterViewChecked(): void {
    // this.handleMenuUILoadingIssues();
  }

  handleMenuUILoadingIssues() {
    // load the js from ./assets/files/assets/js/vertical/vertical-layout.min.js

    if (!this.isUsedinitializeVerticalLayout) {
      initializeVerticalLayout();
      this.isUsedinitializeVerticalLayout = true;
    }
  }
}
