import { SurveyModel } from '@/domain/models/survey';
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository';
import { LoadSurveys, Pagination } from '@/domain/usecases/load-surveys'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (pagination: Pagination): Promise<SurveyModel[]> {
    return await this.loadSurveysRepository.loadAll(pagination)
  }
}
