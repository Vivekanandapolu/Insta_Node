import httpStatusCode from "http-status-codes";
import {
  isValidEmail,
  encryptPassword,
  comparePassword,
} from "../../uitility/uitility.js";
import { Op } from "sequelize";
import Posts from "../models/posts.model.js";
import UserModel from "../models/users.model.js";
export default class UserController {
  async userSignUp(request, response) {
    try {
      //Step-1:Validate the given Email from request body
      if (!isValidEmail(request.body.username)) {
        throw new Error("Enter valid username.");
      }
      //Step-2: Check user exist or not in db by using username.
      let user = await UserModel.findOne({
        where: {
          username: request.body.username,
        },
      });
      if (user) {
        throw new Error("Username is already exists");
      }
      //Step:3 Store hashPassword in request body
      let hashPassword = await encryptPassword(request.body.password);
      request.body.password = hashPassword;
      //Step:4 create user
      const createdUser = await UserModel.createUser(request.body);
      if (createdUser)
        return response
          .status(httpStatusCode.CREATED)
          .send({ message: "User registered sucessfully" });
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: "Something went wrong while registering the User" });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
  async getAllUsers(request, response) {
    try {
      let users = await UserModel.getAllUsers();
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
      let user = await UserModel.findByPk(request.params.id);
      response.status(httpStatusCode.OK).send({ data: user });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error });
    }
  }
  async getOneUser(request, response) {
    try {
      let user = await UserModel.findOne({
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
  async userLogin(request, response) {
    try {
      //Step:1 finding the existing User by using user
      let user = await UserModel.findOne({
        where: {
          username: request.body.username,
        },
        raw: true,
      });
      if (!user)
        return response
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .send({ message: "Enter a valid Username" });

      //Compare password
      let passwordStatus = await comparePassword(
        request.body.password,
        user.password
      );
      if (passwordStatus) {
        delete user.password;
        return response
          .status(httpStatusCode.OK)
          .send({ message: "User Logged in sucessfully", data: user });
      }
      return response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: "Please enter a valid password" });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
  async updateUser(request, response) {
    try {
      let users = await UserModel.update(
        { lastName: "Reddy" },
        {
          where: {
            lastName: "Doe",
          },
        }
      );
      return response.status(httpStatusCode.OK).send({ data: users });
    } catch (error) {
      console.log("hello");
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
  async destroyUser(request, response) {
    try {
      let users = await UserModel.destroy({
        where: {
          age: {
            [Op.lte]: [15],
          },
        },
      });
      return response.status(httpStatusCode.OK).send({ data: users });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
  async getUsersBelowAge(request, response) {
    try {
      let user = await UserModel.getUsersBelowAge(request.params.age);
      response.send({ data: user });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
  async getUserByPk(request, response) {
    try {
      let user = await UserModel.findByPk(3);
      return response.status(httpStatusCode.OK).send({ data: user.firstName });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
  async updateName(request, response) {
    try {
      let updatedUser = await UserModel.update(
        { firstName: "upendra" },
        {
          where: {
            firstName: "Uppendra",
          },
        }
      );
      response.status(httpStatusCode.OK).send({ data: updatedUser });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
  async findOrCreate(request, response) {
    try {
      let user = await UserModel.findOrCreate({
        where: {
          firstName: "gowthu",
          lastName: "",
          age: 13,
          username: "g@gmail.com",
          password: "gowthu",
          isAdmin: false,
        },
      });
      response.status(httpStatusCode.OK).send({ data: user });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
  async postsByUserId(request, response) {
    try {
      let user = await UserModel.findOne({
        where: { id: request.params.id },
        include: [{ model: Posts }],
      });
      response.status(httpStatusCode.OK).send({ data: user });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
