import httpStatusCode from "http-status-codes";
import PostModel from "../models/posts.model.js";
import UserModel from "../models/users.model.js";
export default class PostController {
  async createPost(request, response) {
    try {
      let post = await PostModel.create(request.body);
      response
        .status(httpStatusCode.CREATED)
        .send({ messagae: "Created sucessfully", data: post });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
  async getAllPosts(request, response) {
    try {
      let users = await PostModel.findAll({
        include: [
          {
            all: true,
          },
        ],
      });
      response.status(httpStatusCode.OK).send({ data: users });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
