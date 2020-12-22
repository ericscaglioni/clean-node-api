import { SaveSurveyResultParams, SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'

export const mockSurveyResultModel = (): SurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  id: 'any_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})
