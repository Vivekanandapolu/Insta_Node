//Import Controllers
import UserController from "./user.controller.js";
//Create a Controllers
const user = new UserController();
//Export Router
export default function (router) {
  //Custom Services
  router.post("/api/user/create", user.createUser);
  router.get("/api/user/all", user.getAllUsers);
  router.get("/api/user/getUser/:id", user.getUserByID);
  router.get("/api/users/user/:username", user.getOneUser);
}
