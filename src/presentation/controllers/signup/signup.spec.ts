import { MissingParamError, ServerError, UserAlreadyExistsError } from '../../errors'
import { badRequest, conflict, ok, serverError } from '../../helpers/http/http-helper'
import { HttpRequest, ExistingEmailValidator } from './../../protocols'
import SignUpController from './signup'
import { AccountModel, AddAccount, AddAccountModel, Validator } from './signup-protocols'

const makeExistingEmailValidator = (): ExistingEmailValidator => {
  class ExistingEmailValidatorStub implements ExistingEmailValidator {
    async emailAlreadyExists (email: string): Promise<boolean> {
      return new Promise(resolve => resolve(false))
    }
  }
  return new ExistingEmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountStub()
}

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validatorStub: Validator
  existingEmailValidatorStub: ExistingEmailValidator
}

const makeSut = (): SutTypes => {
  const existingEmailValidatorStub = makeExistingEmailValidator()
  const addAccountStub = makeAddAccount()
  const validatorStub = makeValidator()
  const sut = new SignUpController(addAccountStub, validatorStub, existingEmailValidatorStub)
  return {
    sut,
    addAccountStub,
    validatorStub,
    existingEmailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(makeFakeRequest())
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
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should call Validator with correct data', async () => {
    const { sut, validatorStub } = makeSut()

    const validateSpy = jest.spyOn(validatorStub, 'validate')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut()

    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('any_error'))

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_error')))
  })

  test('Should call ExistingEmailValidator with correct email', async () => {
    const { sut, existingEmailValidatorStub } = makeSut()

    const emailAlreadyExistsSpy = jest.spyOn(existingEmailValidatorStub, 'emailAlreadyExists')
    await sut.handle(makeFakeRequest())
    expect(emailAlreadyExistsSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should return 500 if ExistingEmailValidator throws', async () => {
    const { sut, existingEmailValidatorStub } = makeSut()

    jest.spyOn(existingEmailValidatorStub, 'emailAlreadyExists').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 409 if ExistingEmailValidator returns an account', async () => {
    const { sut, existingEmailValidatorStub } = makeSut()
    jest.spyOn(existingEmailValidatorStub, 'emailAlreadyExists').mockResolvedValueOnce(true)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(conflict(new UserAlreadyExistsError()))
  })
})
