import { loginPath, signUpPath, surveyPath, surveyResultPath } from './paths'
import { accountSchema, addSurveyParamsSchema, apiKeyAuthSchema, loginParamsSchema, signUpParamsSchema, surveyAnswerSchema, surveyResultParamsSchema, surveySchema, surveysSchema, surveyResultSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API de estudo, feita através do curso de Rodrigo Mango',
    version: '0.1.9'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Enquete'
  }],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath,
    '/signup': signUpPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
    account: accountSchema,
    'login-params': loginParamsSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    'survey-answer': surveyAnswerSchema,
    'signup-params': signUpParamsSchema,
    'add-survey-params': addSurveyParamsSchema,
    'survey-result-params': surveyResultParamsSchema,
    'survey-result': surveyResultSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    }
  }
}
