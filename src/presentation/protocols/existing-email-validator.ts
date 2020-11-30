export interface ExistingEmailValidator {
  emailAlreadyExists (email: string): Promise<boolean>
}
