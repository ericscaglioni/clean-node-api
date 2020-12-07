import { badRequest, serverError } from './../../../helpers/http/http-helper'
import { AddSurvey, Controller, HttpRequest, HttpResponse, Validator } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { question, answers } = httpRequest.body
      await this.addSurvey.add({
        question,
        answers
      })
      return null
    } catch (err) {
      return serverError(err)
    }
  }
}
