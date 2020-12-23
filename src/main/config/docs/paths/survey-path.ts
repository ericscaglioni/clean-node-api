export const surveyPath = {
  get: {
    tags: ['Enquetes'],
    summary: 'Retorna enquetes cadastradas',
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
  }
}
