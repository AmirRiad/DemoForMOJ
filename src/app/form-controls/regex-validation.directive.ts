import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { regexValidator } from './regex-validator';

@Directive({
  selector: '[appRegexValidation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RegexValidationDirective, multi: true }]
})
export class RegexValidationDirective implements Validator {

  constructor() { }

  @Input('appRegexValidation') password: string;
  @Input('appRegexValidationErrorMessage') errorMessage: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.password
      ? regexValidator(new RegExp(this.password, 'i'), this.errorMessage)(control)
      : null;
  }

}
