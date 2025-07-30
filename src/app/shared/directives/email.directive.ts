import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export function EmailValidator(): ValidatorFn {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value || emailRegex.test(value)) {
      return null;
    }

    return { invalidEmail: true };
  };
}

@Directive({
    selector: '[emailValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true,
        },
    ]
})
export class EmailValidatorDirective implements Validator {
    private readonly validator = EmailValidator();

    validate(control: AbstractControl): ValidationErrors | null {
        return this.validator(control);
    }
}
