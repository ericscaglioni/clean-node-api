export default {
  port: process.env.PORT || 5050,
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
  jwtSecret: process.env.JWT_SECRET || 'ah349=4##VE'
}
