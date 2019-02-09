import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.css']
})
export class ValidationMessagesComponent implements OnInit {

  @Input() controlObject: any;

  constructor() { }

  ngOnInit() {
  }

}
