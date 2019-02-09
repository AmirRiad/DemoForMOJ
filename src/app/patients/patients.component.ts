import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonService } from '../services/common.service';
declare var $: any;

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})


export class PatientsComponent implements OnInit {
  model: any;
  itemIdToDelete;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  ngOnInit() {
    this.getData();
  }

  getData(pageNumber = 1) {
    this.http
      .get(this.commonService.urls.patients, {
        params: {
          page: pageNumber.toString()
        }
      })
      .subscribe(data => {
        this.model = data;
      }, error => {
        console.log(error.message);
      });

  }

  openDeleteItemModal(itemId) {
    this.itemIdToDelete = itemId;
    $('#small-Modal').modal();
  }

  deleteItem() {
    if (this.itemIdToDelete) {

      // todo: delete item
      this.http
      .delete(this.commonService.urls.patients, {
        params: {
          id: this.itemIdToDelete
        }
      })
      .subscribe(data => {
        console.log('item ' + this.itemIdToDelete + ' deleted');
        this.itemIdToDelete = null;
        $('#small-Modal').modal('hide');
      this.getData(1);
      }, error => {
        console.log(error.message);
      });

    }
  }

}


