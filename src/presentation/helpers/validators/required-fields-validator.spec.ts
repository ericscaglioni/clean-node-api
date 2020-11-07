import { MissingParamError } from './../../errors/missing-param-error'
import { RequiredFieldsValidator } from './required-fields-validator'

describe('Required Fields Validator', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldsValidator(['any_field'])
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
