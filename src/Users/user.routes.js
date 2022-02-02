//Import Controllers
import UserController from "./user.controller.js";
//Create a Controllers
const user = new UserController();
//Export Router
export default function UserRoutes(router) {
  //Custom Services
  router.post("/api/user/signup", user.userSignUp);
  router.post("/api/user/login", user.userLogin);
  router.get("/api/user/all", user.getAllUsers);
  router.get("/api/users/user/:id", user.getUserByID);
  router.get("/api/users/user/:username", user.getOneUser);
  router.get("/api/user/posts/:id", user.postsByUserId);

  // router.get("/api/user/update", user.updateUser);
  // router.get("/api/user/destroy", user.destroyUser);
  // router.get("/api/user/getall", user.getAllUsers);
  router.get("/api/user/below/:age", user.getUsersBelowAge);
  // router.get("/api/user/byPk", user.getUserByPk);
  // router.get("/api/user/update", user.updateName);
  // router.get("/api/user/find", user.findOrCreate);
}
