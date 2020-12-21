import { LoadSurveys, LoadSurveysRepository, Pagination, SurveyModel } from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (pagination: Pagination): Promise<SurveyModel[]> {
    return await this.loadSurveysRepository.loadAll(pagination)
  }
}
