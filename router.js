//Import modules or path's
import Router from 'express'
import userRoutes from './controllers/user.routes.js'
//Create Router Instance
const router = new Router()
userRoutes(router)
//Export router
export default router