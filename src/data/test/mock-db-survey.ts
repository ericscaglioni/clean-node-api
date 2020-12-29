import { AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols/db/survey'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModels, mockSurveyModel } from '@/domain/test'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { Pagination } from '@/domain/usecases/survey/load-surveys'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (data: AddSurveyParams): Promise<void> { }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (accountId: string, pagination: Pagination): Promise<SurveyModel[]> {
      return mockSurveyModels()
    }
  }
  return new LoadSurveysRepositoryStub()
}
