import { MissingParamError } from '../../errors'
import { Validator } from '../../protocols/validator'

export class RequiredFieldsValidator implements Validator {
  constructor (private readonly fieldNames: string[]) {}

  validate (input: any): Error {
    for (const fieldName of this.fieldNames) {
      if (!input[fieldName]) {
        return new MissingParamError(fieldName)
      }
    }
  }
}
