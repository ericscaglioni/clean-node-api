import { InvalidParamError } from '../../errors'
import { EmailValidator, ExistingEmailValidator } from '../../protocols'
import { EmailValidation } from './email-validation'

const makeExistingEmailValidatorStub = (): ExistingEmailValidator => {
  class ExistingEmailValidatorStub implements ExistingEmailValidator {
    async emailAlreadyExists (email: string): Promise<boolean> {
      return new Promise(resolve => resolve(false))
    }
  }
  return new ExistingEmailValidatorStub()
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
  existingEmailValidatorStub: ExistingEmailValidator
}

const makeSut = (): SutTypes => {
  const existingEmailValidatorStub = makeExistingEmailValidatorStub()
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub, existingEmailValidatorStub)
  return {
    sut,
    emailValidatorStub,
    existingEmailValidatorStub
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
  test('Should call ExistingEmailValidator with correct email', async () => {
    const { sut, existingEmailValidatorStub } = makeSut()

    const emailAlreadyExistsSpy = jest.spyOn(existingEmailValidatorStub, 'emailAlreadyExists')

    await sut.emailAlreadyExists('any_email@email.com')
    expect(emailAlreadyExistsSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should return true if ExistingEmailValidator returns true', async () => {
    const { sut, existingEmailValidatorStub } = makeSut()

    jest.spyOn(existingEmailValidatorStub, 'emailAlreadyExists').mockResolvedValueOnce(true)

    const emailAlreadyExists = await sut.emailAlreadyExists('any_email@email.com')
    expect(emailAlreadyExists).toBeTruthy()
  })

  test('Should throw if ExistingEmailValidator throws', async () => {
    const { sut, existingEmailValidatorStub } = makeSut()

    jest.spyOn(existingEmailValidatorStub, 'emailAlreadyExists').mockImplementationOnce(() => {
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
