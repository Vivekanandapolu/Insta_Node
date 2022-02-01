import PostController from "./posts.controller.js";
const UserPosts = new PostController();
export default function PostsOfUsers(router) {
    router.post("/post/create", UserPosts.createPost);
    router.get("/post/all", UserPosts.getAllPosts);
}