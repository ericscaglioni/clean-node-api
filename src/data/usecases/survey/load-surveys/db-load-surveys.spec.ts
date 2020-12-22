import { mockLoadSurveysRepository } from '@/data/test'
import { mockSurveyModels } from '@/domain/test'
import MockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository, Pagination } from './db-load-surveys-protocols'

const makeFakePagination = (): Pagination => ({
  limit: 10,
  offset: 0
})

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
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
    expect(surveys).toEqual(mockSurveyModels())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(makeFakePagination())
    await expect(promise).rejects.toThrow()
  })
})
