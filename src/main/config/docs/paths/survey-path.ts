export const surveyPath = {
  get: {
    tags: ['Enquetes'],
    summary: 'Rota que retorna enquetes cadastradas',
    security: [{
      apiKeyAuth: []
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys'
            }
          }
        }
      }
    }
  },
  post: {
    tags: ['Enquetes'],
    summary: 'Rota de cadastro de enquete',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/add-survey-params'
          }
        }
      }
    },
    security: [{
      apiKeyAuth: []
    }],
    responses: {
      204: {
        description: 'Sucesso'
      }
    }
  }
}
