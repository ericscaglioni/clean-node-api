import { SurveyModel } from '@/domain/models/survey'

export type Pagination = {
  limit: number
  offset: number
}

export interface LoadSurveys {
  load (pagination: Pagination): Promise<SurveyModel[]>
}
