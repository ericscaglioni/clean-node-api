import { Validator } from '../../../../../presentation/protocols'
import { RequiredFieldsValidator, ValidatorComposite } from '../../../../../validation/validators'
import { makeAddSurveyValidator } from './add-survey-validator-factory'

jest.mock('../../../../../validation/validators/validator-composite')

describe('AddSurveyValidator Factory', () => {
  test('Should call ValidatorComposite with all validators', () => {
    makeAddSurveyValidator()
    const validators: Validator[] = []
    const requiredFields = ['question', 'answers']
    validators.push(new RequiredFieldsValidator(requiredFields))
    expect(ValidatorComposite).toHaveBeenCalledWith(validators)
  })
})
