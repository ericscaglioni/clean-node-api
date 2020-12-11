import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { SurveyModel } from '../../../../domain/models/survey'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { Pagination } from '../../../../domain/usecases/load-surveys'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadSurveysRepository } from './../../../../data/protocols/db/survey/load-surveys-repository'

export class SurveyMongoRepository implements
  AddSurveyRepository,
  LoadSurveysRepository {
  async add (data: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  }

  async loadAll ({ limit, offset }: Pagination): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    return await surveyCollection.find<SurveyModel>()
      .limit(limit)
      .skip(offset)
      .toArray()
  }
}
