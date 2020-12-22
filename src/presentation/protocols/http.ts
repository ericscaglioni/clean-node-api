export type HttpRequest = {
  body?: any
  headers?: any
  query?: any
  params?: any
  accountId?: string
}

export type HttpResponse = {
  statusCode: number
  body: any
}
