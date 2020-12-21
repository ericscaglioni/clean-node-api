import MockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository, Pagination, SurveyModel } from './db-load-surveys-protocols'

const makeFakeSurveys = (): SurveyModel[] => ([{
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
}, {
  id: 'other_id',
  question: 'other_question',
  answers: [{
    image: 'other_image',
    answer: 'other_answer'
  }],
  date: new Date()
}])

const makeFakePagination = (): Pagination => ({
  limit: 10,
  offset: 0
})

const makeLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (pagination: Pagination): Promise<SurveyModel[]> {
      return makeFakeSurveys()
    }
  }
  return new LoadSurveysRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository with correct data', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load(makeFakePagination())
    expect(loadAllSpy).toHaveBeenCalledWith(makeFakePagination())
  })

  test('Should return surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load(makeFakePagination())
    expect(surveys).toEqual(makeFakeSurveys())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(makeFakePagination())
    await expect(promise).rejects.toThrow()
  })
})