export const surveyPath = {
  get: {
    tags: ['Enquete'],
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
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Enquete'],
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
    responses: {
      204: {
        description: 'Sucesso'
      }
    }
  }
}
