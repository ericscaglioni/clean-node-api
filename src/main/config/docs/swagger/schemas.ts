import {
  accountSchema,
  addSurveyParamsSchema,
  loginParamsSchema,
  signUpParamsSchema,
  surveyAnswerSchema,
  surveyResultParamsSchema,
  surveyResultSchema,
  surveySchema,
  surveysSchema
} from './schemas/'

export default {
  account: accountSchema,
  'login-params': loginParamsSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  'survey-answer': surveyAnswerSchema,
  'signup-params': signUpParamsSchema,
  'add-survey-params': addSurveyParamsSchema,
  'survey-result-params': surveyResultParamsSchema,
  'survey-result': surveyResultSchema
}
