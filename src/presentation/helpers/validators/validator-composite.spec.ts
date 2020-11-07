import { Validator } from '.'
import { MissingParamError } from '../../errors'
import { ValidatorComposite } from './validator-composite'

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}

interface SutTypes {
  sut: ValidatorComposite
  validatorStub: Validator
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const sut = new ValidatorComposite([validatorStub])
  return {
    sut,
    validatorStub
  }
}

describe('Validator Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
