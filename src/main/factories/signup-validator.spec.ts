import { RequiredFieldsValidator } from './../../presentation/helpers/validators/required-fields-validator'
import { ValidatorComposite } from './../../presentation/helpers/validators/validator-composite'
import { makeSignUpValidator } from './signup-validator'

jest.mock('./../../presentation/helpers/validators/validator-composite')

describe('SignUpValidator Factory', () => {
  test('Should call ValidatorComposite with all validators', () => {
    makeSignUpValidator()
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    expect(ValidatorComposite).toHaveBeenCalledWith([
      new RequiredFieldsValidator(requiredFields)
    ])
  })
})
