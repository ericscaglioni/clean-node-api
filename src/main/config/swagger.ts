import swaggerDocs from '@/main/config/docs/swagger-docs'
import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'

export default (app: Express): void => {
  app.use('/docs', serve, setup(swaggerDocs))
}
