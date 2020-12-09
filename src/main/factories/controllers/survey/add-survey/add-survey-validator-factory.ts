import { Validator } from '../../../../../presentation/protocols'
import { RequiredFieldsValidator, ValidatorComposite } from '../../../../../validation/validators'

export const makeAddSurveyValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  const requiredFields = ['question', 'answers']
  validators.push(new RequiredFieldsValidator(requiredFields))
  return new ValidatorComposite(validators)
}
