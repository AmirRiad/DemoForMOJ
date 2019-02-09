import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-pager',
  templateUrl: './custom-pager.component.html',
  styleUrls: ['./custom-pager.component.css']
})
export class CustomPagerComponent implements OnInit {

  @Input()
  private page = 1;

  @Input()
  private pageSize = 10;

  @Input()
  private totalItems = 0;

  @Output()
  private changePage: EventEmitter<number> = new EventEmitter<number>();

  pager: any = {};

  constructor() {}

  ngOnInit() {
    this.calculatePages();
  }

  setPage(page: number) {
    // this.pager = this.getPager(this.totalItems, page, this.pageSize);
    this.page = page;
    this.calculatePages();
    this.changePage.emit(page);
  }

  calculatePages(newTotalItems = -1) {
    const numberOfItems = newTotalItems === -1 ? this.totalItems : newTotalItems;
    this.pager = this.getPager(numberOfItems, this.page, this.pageSize);
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages; // totalItems / pageSize;
    console.log("totalItems : " + totalItems);
    if (totalItems === 0 ) {
      totalPages = 0;
    } else {
      totalPages = Math.ceil(totalItems / pageSize);
    }

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
