//Import modules or path's
import Router from 'express'
import userRoutes from './controllers/user.routes.js';
import PostsOfUsers from './controllers/post.routes.js';
//Create Router Instance
const router = new Router()
userRoutes(router)
PostsOfUsers(router)
//Export router
export default router