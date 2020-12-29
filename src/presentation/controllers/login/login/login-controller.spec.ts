import { mockAuthenticator, mockValidator } from '@/presentation/test'
import { MissingParamError } from '../../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper'
import { LoginController } from './login-controller'
import { Authenticator, HttpRequest, Validator } from './login-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

type SutTypes = {
  sut: LoginController
  authenticatorStub: Authenticator
  validatorStub: Validator
}

const makeSut = (): SutTypes => {
  const authenticatorStub = mockAuthenticator()
  const validatorStub = mockValidator()
  const sut = new LoginController(authenticatorStub, validatorStub)
  return {
    sut,
    authenticatorStub,
    validatorStub
  }
}

describe('Login Controller', () => {
  test('Should call Authenticator with correct data', async () => {
    const { sut, authenticatorStub } = makeSut()
    const authSpy = jest.spyOn(authenticatorStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 401 if Authentication failed', async () => {
    const { sut, authenticatorStub } = makeSut()
    jest.spyOn(authenticatorStub, 'auth')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authenticator throws', async () => {
    const { sut, authenticatorStub } = makeSut()
    jest.spyOn(authenticatorStub, 'auth').mockImplementationOnce(() => {
      throw new Error('teste')
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error('teste')))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token',
      name: 'any_name'
    }))
  })

  test('Should call Validator with correct data', async () => {
    const { sut, validatorStub } = makeSut()

    const validateSpy = jest.spyOn(validatorStub, 'validate')

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut()

    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('any_error'))

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_error')))
  })
})
