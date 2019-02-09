
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-patients-form',
  templateUrl: './patients-form.component.html',
  styleUrls: ['./patients-form.component.css']
})

export class PatientsFormComponent implements OnInit {

  currentId = 0;
  model: any = {};
  countries: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getItemId();
    this.getCountries();
  }


  getCountries() {
    this.http
      .get(this.commonService.urls.patients, {
        params: {
          page: '1',
          getAll: 'true'
        }
      })
      .subscribe(data => {

        this.countries = data;
      });

  }

  onSubmit() {
    if (!this.model.Id || this.model.Id === 0) {
      this.addItem();
    } else {
      this.updateItem();
    }
  }

  getItemId() {
    this.model.Id = 0;
    // this.currentId = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     params.get('id'))
    // );

    if (this.route.snapshot.params['id']) {
      this.getItem(this.route.snapshot.params['id']);
    }
  }

  getItem(id) {
    this.model.Id = id;

    this.http
      .get(this.commonService.urls.patients, {
        params: {
          id: id
        }
      })
      .subscribe(data => {
        this.model = data;
      });
  }

  addItem() {
    this.http
      .post(this.commonService.urls.patients, this.model)
      .subscribe(data => {
        // this.model = data;
        // todo: clear model
        // todo: show success message
        this.router.navigate(['/patient']);
      });
  }

  updateItem() {
    this.http
      .put(this.commonService.urls.patients, this.model, {
        params: {
          id: this.model.Id
        }
      })
      .subscribe(data => {
        // this.model = data;
        // todo: redirect to listing page
        // todo: show success message
        this.router.navigate(['/patient']);
      });
  }

  resetItem() {
    this.model = {
      Id: 0
    };
  }

}
