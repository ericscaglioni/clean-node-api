import { InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { AddAccount, Controller, EmailValidator, HttpRequest, HttpResponse, Validator } from '../signup/signup-protocols'

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validator: Validator

  constructor (
    emailValidator: EmailValidator,
    addAccount: AddAccount,
    validator: Validator
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validator = validator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
