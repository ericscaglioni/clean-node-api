import { Validator } from '@/presentation/protocols'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { CompareFieldsValidator, EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '@/validation/validators'
import { makeSignUpValidator } from './signup-validator-factory'

jest.mock('@/validation/validators/validator-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidator Factory', () => {
  test('Should call ValidatorComposite with all validators', () => {
    makeSignUpValidator()
    const validators: Validator[] = []

    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    validators.push(new RequiredFieldsValidator(requiredFields))

    validators.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
    validators.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidatorComposite).toHaveBeenCalledWith(validators)
  })
})
