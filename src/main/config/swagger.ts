import swaggerDocs from '@/main/config/docs/swagger-docs'
import { noCache } from '@/main/middlewares/no-cache'
import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup(swaggerDocs))
}
