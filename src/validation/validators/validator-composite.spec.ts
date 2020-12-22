import { mockValidator } from '@/validation/test'
import { MissingParamError } from '../../presentation/errors'
import { Validator } from '../../presentation/protocols'
import { ValidatorComposite } from './validator-composite'

type SutTypes = {
  sut: ValidatorComposite
  validatorStubs: Validator[]
}

const makeSut = (): SutTypes => {
  const validatorStubs = [mockValidator(), mockValidator()]
  const sut = new ValidatorComposite(validatorStubs)
  return {
    sut,
    validatorStubs
  }
}

describe('Validator Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validatorStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
