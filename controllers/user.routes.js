//Import Controllers
import UserController from "./user.controller.js";
//Create a Controllers
const user = new UserController();
//Export Router
export default function userRoutes(router) {
  //Custom Services
  router.post("/api/user/signup", user.userSignUp);
  router.get("/api/user/all", user.getAllUsers);
  router.get("/api/users/user/:id", user.getUserByID);
  router.get("/api/users/user/:username", user.getOneUser);
  router.post("/api/user/login", user.userLogin);
  router.get("/api/user/update", user.updateUser);
  router.get("/api/user/destroy", user.destroyUser);
  router.get("/api/user/getall", user.getAllUsers)
}
