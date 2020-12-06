import { InvalidParamError } from '../../presentation/errors'
import { Validator } from '../../presentation/protocols'
import { EmailValidator } from '../protocols/email-validator'

export class EmailValidation implements Validator {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
