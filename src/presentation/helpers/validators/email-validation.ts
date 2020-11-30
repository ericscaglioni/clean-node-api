import { Validator, EmailValidator, ExistingEmailValidator } from '../../protocols'
import { InvalidParamError } from '../../errors'

export class EmailValidation implements Validator, ExistingEmailValidator {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
    private readonly existingEmailValidator: ExistingEmailValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }

  async emailAlreadyExists (email: string): Promise<boolean> {
    return await this.existingEmailValidator.emailAlreadyExists(email)
  }
}
