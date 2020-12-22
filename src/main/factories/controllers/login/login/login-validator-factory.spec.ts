import { Validator } from '@/presentation/protocols'
import { mockEmailValidator } from '@/validation/test'
import { EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '@/validation/validators'
import { makeLoginValidator } from './login-validator-factory'

jest.mock('@/validation/validators/validator-composite')

describe('LoginValidator Factory', () => {
  test('Should call ValidatorComposite with all validators', () => {
    makeLoginValidator()
    const validators: Validator[] = []

    const requiredFields = ['email', 'password']
    validators.push(new RequiredFieldsValidator(requiredFields))

    validators.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidatorComposite).toHaveBeenCalledWith(validators)
  })
})
