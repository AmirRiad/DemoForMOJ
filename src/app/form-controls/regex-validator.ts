import { ValidatorFn, AbstractControl } from "@angular/forms";

/** A hero's name can't match the given regular expression */
export function regexValidator(nameRe: RegExp, errorMessage: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isValidRegex = !nameRe.test(control.value);
        return isValidRegex ? { 'appRegexValidation': { value: control.value, errorMessage: errorMessage } } : null;
    };
}