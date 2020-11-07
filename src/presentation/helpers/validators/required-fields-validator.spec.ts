import { MissingParamError } from './../../errors/missing-param-error'
import { RequiredFieldsValidator } from './required-fields-validator'

const makeSut = (): RequiredFieldsValidator => new RequiredFieldsValidator(['any_field'])

describe('Required Fields Validator', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'field' })
    expect(error).toBeFalsy()
  })
})
