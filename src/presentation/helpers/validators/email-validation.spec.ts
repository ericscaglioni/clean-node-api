import { LoadAccountByEmailRepository } from '../../../data/protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '../../../domain/models/account'
import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols'
import { EmailValidation } from './email-validation'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_hashed_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    emailValidatorStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('Email Validation', () => {
  test('Should return an error if an EmailValidation returns false', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'invalid_email@email.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call emailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@email.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })
  test('Should throw if Email Validator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})

describe('Existing Email Validator', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    await sut.emailAlreadyExists('any_email@email.com')
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should return true if LoadAccountByEmailRepository returns an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(makeFakeAccount())

    const emailAlreadyExists = await sut.emailAlreadyExists('any_email@email.com')
    expect(emailAlreadyExists).toBeTruthy()
  })

  test('Should throw if ExistingEmailValidator throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.emailAlreadyExists('any_email@email.com')
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if ExistingEmailValidator returns false', async () => {
    const { sut } = makeSut()

    const emailAlreadyExists = await sut.emailAlreadyExists('any_email@email.com')
    expect(emailAlreadyExists).toBeFalsy()
  })
})
