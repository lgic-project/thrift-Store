// src/validators/nepali-phone-number.validator.ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNepaliPhoneNumber', async: false })
export class IsNepaliPhoneNumber implements ValidatorConstraintInterface {
  validate(value: string) {
    // Customize this regex pattern based on the format of Nepali phone numbers
    const nepaliPhoneNumberPattern = /^[0-9]{10}$/;
    return nepaliPhoneNumberPattern.test(value);
  }

  defaultMessage() {
    return 'Invalid Nepali phone number format';
  }
}
