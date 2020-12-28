export const surveyResultPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Enquete'],
    summary: 'Rota que salva resposta de uma enquete',
    parameters: [{
      name: 'surveyId',
      in: 'path',
      required: true,
      description: 'Id de uma enquete',
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/survey-result-params'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/survey-result'
            }
          }
        }
      }
    }
  },
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Enquete'],
    summary: 'Rota que retorna resposta(s) de uma enquete',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [{
      name: 'surveyId',
      in: 'path',
      required: true,
      description: 'Id de uma enquete',
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/survey-result'
            }
          }
        }
      }
    }
  }
}
