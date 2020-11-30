import { InvalidParamError } from '../../errors'
import { EmailValidator, ExistingEmailValidator, Validator } from '../../protocols'
import { LoadAccountByEmailRepository } from './../../../data/protocols/db/account/load-account-by-email-repository'

export class EmailValidation implements Validator, ExistingEmailValidator {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }

  async emailAlreadyExists (email: string): Promise<boolean> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    return !!account
  }
}
