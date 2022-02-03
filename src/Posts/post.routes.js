import PostController from "./posts.controller.js";
const postController = new PostController();
export default function PostsRoutes(router) {
  router.post("/api/post/create", postController.createPost);
  router.get("/api/post/all", postController.getAllPosts);
  router.get("/api/post/:id", postController.getPostByID);
}
