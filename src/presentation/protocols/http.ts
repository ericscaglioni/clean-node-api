export interface HttpRequest {
  body?: any
  headers?: any
  query?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}
