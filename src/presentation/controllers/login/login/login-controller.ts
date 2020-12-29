import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper'
import { Authenticator, Controller, HttpRequest, HttpResponse, Validator } from './login-controller-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authenticator: Authenticator,
    private readonly validator: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

      const authentication = await this.authenticator.auth({
        email,
        password
      })
      if (!authentication) {
        return unauthorized()
      }
      return ok(authentication)
    } catch (error) {
      return serverError(error)
    }
  }
}
