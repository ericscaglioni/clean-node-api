import { SurveyModel } from '../models/survey'

export interface Pagination {
  limit: number
  offset: number
}

export interface LoadSurveys {
  load (pagination: Pagination): Promise<SurveyModel[]>
}
