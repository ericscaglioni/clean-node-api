export const surveyAnswerResultSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string'
    },
    answer: {
      type: 'string'
    },
    count: {
      type: 'number'
    },
    percentage: {
      type: 'number'
    }
  }
}
