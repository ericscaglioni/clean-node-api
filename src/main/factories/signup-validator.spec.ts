import { CompareFieldsValidator, RequiredFieldsValidator, Validator, ValidatorComposite } from './../../presentation/helpers/validators'
import { makeSignUpValidator } from './signup-validator'

jest.mock('./../../presentation/helpers/validators/validator-composite')

describe('SignUpValidator Factory', () => {
  test('Should call ValidatorComposite with all validators', () => {
    makeSignUpValidator()
    const validators: Validator[] = []

    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    validators.push(new RequiredFieldsValidator(requiredFields))

    validators.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
    expect(ValidatorComposite).toHaveBeenCalledWith(validators)
  })
})
