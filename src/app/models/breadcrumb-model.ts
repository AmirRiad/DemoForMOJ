import { Params } from '@angular/router';

// export class BreadcrumbModel {
//   label: string;
//   url: string;
// }

export interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}
