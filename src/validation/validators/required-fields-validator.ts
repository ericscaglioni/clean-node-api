import { MissingParamError } from '../../presentation/errors'
import { Validator } from '../../presentation/protocols'

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
