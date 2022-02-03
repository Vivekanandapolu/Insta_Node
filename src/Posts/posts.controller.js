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
      let posts = await PostModel.findAll({
        raw: true,
      });
      response.status(httpStatusCode.OK).send({ data: posts });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
  async getPostByID(request, response) {
    try {
      let post = await PostModel.findByPk(request.params.id, {
        include: [{ model: UserModel }],
      });
      response.status(httpStatusCode.OK).send({ data: post });
    } catch (error) {
      response
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
