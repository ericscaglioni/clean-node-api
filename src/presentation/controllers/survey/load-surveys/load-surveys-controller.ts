import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit = 10, offset = 0 } = httpRequest.body || {}
      const surveys = await this.loadSurveys.load({ limit, offset })
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
