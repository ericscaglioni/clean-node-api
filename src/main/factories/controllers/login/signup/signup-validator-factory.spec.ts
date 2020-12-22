import { Validator } from '@/presentation/protocols'
import { mockEmailValidator } from '@/validation/test'
import { CompareFieldsValidator, EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '@/validation/validators'
import { makeSignUpValidator } from './signup-validator-factory'

jest.mock('@/validation/validators/validator-composite')

describe('SignUpValidator Factory', () => {
  test('Should call ValidatorComposite with all validators', () => {
    makeSignUpValidator()
    const validators: Validator[] = []

    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    validators.push(new RequiredFieldsValidator(requiredFields))

    validators.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
    validators.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidatorComposite).toHaveBeenCalledWith(validators)
  })
})
