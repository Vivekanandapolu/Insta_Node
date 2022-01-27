import User from "../models/users.model.js";
import httpStatusCode from "http-status-codes";
export default class UserController {
  async createUser(request, response) {
    try {
      let createdUser = await User.create(request.body);
      response
        .status(httpStatusCode.CREATED)
        .send({ message: "User created.", data: createdUser.dataValues });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error });
    }
  }
  async getAllUsers(request, response) {
    try {
      let users = await User.findAll();
      if (users.length > 0) {
        response.status(httpStatusCode.OK).send({ data: users });
      } else {
        response
          .status(httpStatusCode.NO_CONTENT)
          .send({ message: "No user found in DB" });
      }
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error });
    }
  }
  async getUserByID(request, response) {
    try {
      let user = await User.findByPk(request.params.id);
      response.status(httpStatusCode.OK).send({ data: user });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error });
    }
  }
  async getOneUser(request, response) {
    try {
      let user = await User.findOne({
        where: {
          username: request.params.username,
        },
      });
      if (user) {
        response.send(user);
      } else {
        response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "user not found" });
      }
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error });
    }
  }
}
