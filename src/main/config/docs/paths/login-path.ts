export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'Faz login do usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/login-params'
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
              $ref: '#/schemas/account'
            }
          }
        }
      }
    }
  }
}
