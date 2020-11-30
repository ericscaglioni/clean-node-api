import { badRequest, conflict, ok, serverError } from '../../helpers/http/http-helper'
import { AddAccount, Controller, ExistingEmailValidator, HttpRequest, HttpResponse, Validator } from '../signup/signup-protocols'
import { UserAlreadyExistsError } from './../../errors'

export default class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validator: Validator,
    private readonly existingEmailValidator: ExistingEmailValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const emailExists = await this.existingEmailValidator.emailAlreadyExists(email)
      if (emailExists) {
        return conflict(new UserAlreadyExistsError())
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
