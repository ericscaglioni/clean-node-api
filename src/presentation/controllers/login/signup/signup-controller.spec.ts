import { mockAuthenticator, mockAddAccount } from '@/presentation/test'
import { mockValidator } from '@/validation/test'
import { EmailInUseError, MissingParamError, ServerError } from '../../../errors'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { HttpRequest } from '../../../protocols'
import SignUpController from './signup-controller'
import { AddAccount, Authenticator, Validator } from './signup-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  validatorStub: Validator
  authenticatorStub: Authenticator
}

const makeSut = (): SutTypes => {
  const authenticatorStub = mockAuthenticator()
  const addAccountStub = mockAddAccount()
  const validatorStub = mockValidator()
  const sut = new SignUpController(addAccountStub, validatorStub, authenticatorStub)
  return {
    sut,
    addAccountStub,
    validatorStub,
    authenticatorStub
  }
}

describe('SignUp Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
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

  test('Should call Authenticator with correct data', async () => {
    const { sut, authenticatorStub } = makeSut()
    const authSpy = jest.spyOn(authenticatorStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if Authenticator throws', async () => {
    const { sut, authenticatorStub } = makeSut()
    jest.spyOn(authenticatorStub, 'auth').mockImplementationOnce(() => {
      throw new Error('teste')
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error('teste')))
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockResolvedValueOnce(null)

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })
})
