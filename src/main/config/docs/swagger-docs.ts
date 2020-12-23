import { loginPath, surveyPath } from './paths'
import { accountSchema, loginParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema, apiKeyAuthSchema } from './schemas'

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
    name: 'Enquetes'
  }],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    'login-params': loginParamsSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    'survey-answer': surveyAnswerSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    }
  }
}
