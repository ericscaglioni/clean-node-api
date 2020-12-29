import { SurveyModel } from '@/domain/models/survey'
import { Pagination } from '@/domain/usecases/survey/load-surveys'

export interface LoadSurveysRepository {
  loadAll (accountId: string, pagination: Pagination): Promise<SurveyModel[]>
}
