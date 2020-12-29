import { AccountModel } from '@/domain/models/account'
import { mockAddAccountParams, mockAddSurveyParams } from '@/domain/test'
import { Pagination } from '@/domain/usecases/survey/load-surveys'
import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers'
import { SurveyMongoRepository } from './survey-mongo-repository'

const mockPagination = (): Pagination => ({
  limit: 10,
  offset: 0
})

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return MongoHelper.map(res.ops[0])
}

const insertManySurveys = async (): Promise<void> => {
  await surveyCollection.insertMany([{
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  }, {
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  }])
}

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  describe('add()', () => {
    test('Should add survey on success', async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      })
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const account = await mockAccount()
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
      const res = await surveyCollection.insertMany(addSurveyModels)
      const survey = MongoHelper.map(res.ops[1])
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id, mockPagination())
      expect(surveys).toBeTruthy()
      expect(surveys).toHaveLength(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[0].answered).toBeFalsy()
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
      expect(surveys[1].answered).toBeTruthy()
    })

    test('Should load surveys according to limit', async () => {
      const account = await mockAccount()
      await insertManySurveys()
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id, { limit: 1, offset: 0 })
      expect(surveys).toBeTruthy()
      expect(surveys).toHaveLength(1)
    })

    test('Should load surveys according to limit and offset', async () => {
      const account = await mockAccount()
      await insertManySurveys()
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id, { limit: 10, offset: 2 })
      expect(surveys).toBeTruthy()
      expect(surveys).toHaveLength(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey on success', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      })
      const id = res.ops[0]._id
      const sut = makeSut()
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
})
