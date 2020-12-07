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

      const accessToken = await this.authenticator.auth({
        email,
        password
      })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
