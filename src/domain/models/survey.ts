export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswer[]
  date: Date
  answered?: boolean
}

type SurveyAnswer = {
  image?: string
  answer: string
}
