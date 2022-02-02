//Import modules or path's
import Router from "express";
import UserRoutes from "./src/Users/user.routes.js";
import PostsRoutes from "./src/Posts/post.routes.js";
//Create Router Instance
const router = new Router();
UserRoutes(router);
PostsRoutes(router);
//Export router
export default router;
