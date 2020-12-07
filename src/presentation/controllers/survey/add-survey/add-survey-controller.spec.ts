import { badRequest } from './../../../helpers/http/http-helper'
import { AddSurveyController } from './add-survey-controller'
import { AddSurvey, AddSurveyModel, HttpRequest, Validator } from './add-survey-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

const makeAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyModel): Promise<void> {
      return null
    }
  }
  return new AddSurveyStub()
}

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}

interface SutTypes {
  sut: AddSurveyController
  validatorStub: Validator
  addSurveyStub: AddSurvey
}

const makeSut = (): SutTypes => {
  const addSurveyStub = makeAddSurvey()
  const validatorStub = makeValidator()
  const sut = new AddSurveyController(validatorStub, addSurveyStub)
  return {
    sut,
    validatorStub,
    addSurveyStub
  }
}

describe('Add Survey Controller', () => {
  test('Should call Validator with correct data', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return badRequest if Validator fails', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct data', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
