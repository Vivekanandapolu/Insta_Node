import Posts from "../models/posts.model.js";
import httpStatusCode from "http-status-codes";
export default class PostController {
    async createPost(request, response) {
        try {
            let post = await Posts.create(request.body)
            response.status(httpStatusCode.CREATED).send({ messagae: "Created sucessfully", data: post })
        } catch (error) {
            response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message });
        }
    }
    async getAllPosts(request, response) {
        try {
            let users = await Posts.findAll();
            response.status(httpStatusCode.OK).send({ data: users })
        } catch (error) {
            console.log("hello");
            response.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message });
        }
    }
}