import { KYCType, Role } from '@prisma/client';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class MatchRole implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const valid = Role.hasOwnProperty(args.value);
    return valid; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return `Role doesn't match.`;
  }
}

@ValidatorConstraint({ name: 'customText', async: false })
export class MatchKycType implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const valid = KYCType.hasOwnProperty(args.value);
    return valid; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return `nId type doesn't match.`;
  }
}
