import { Authenticator } from '../../../domain/usecases/authenticator'
import { MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols'
import { InvalidParamError } from './../../errors/invalid-param-error'
import { Controller } from './../../protocols/controller'
import { EmailValidator } from './../../protocols/email-validator'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authenticator: Authenticator

  constructor (emailValidator: EmailValidator, authenticator: Authenticator) {
    this.emailValidator = emailValidator
    this.authenticator = authenticator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      await this.authenticator.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
