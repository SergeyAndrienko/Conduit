interface Errors {
  [key: string]: string
}

export interface BackendErrorsInterface {
  message: string
  errors: Errors
}
