import { AddSurveyParams, AddSurveyRepository } from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurveyRepository {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(data) 
  }
}