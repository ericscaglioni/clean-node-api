import docs from '@/main/config/docs/swagger'
import { noCache } from '@/main/middlewares/no-cache'
import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup(docs))
}
