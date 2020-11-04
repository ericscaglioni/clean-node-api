import { MissingParamError } from '../../errors/missing-param-error'
import { Validator } from './validator'

export class RequiredFieldsValidator implements Validator {
  private readonly fieldNames: string[]

  constructor (fieldNames: string[]) {
    this.fieldNames = fieldNames
  }

  validate (input: any): Error {
    for (const fieldName of this.fieldNames) {
      if (!input[fieldName]) {
        return new MissingParamError(fieldName)
      }
    }
  }
}
