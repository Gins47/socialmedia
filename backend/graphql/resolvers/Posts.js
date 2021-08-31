const Post = require("../../models/Post");
const { validatePostID } = require("../../utils/validators");

const { UserInputError } = require("apollo-server");
module.exports = {
  Query: {
    /**
     * Find all the post
     * @returns
     *
     */
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        console.log(` An error as occurred while fetching the posts ${JSON.stringify(err)} `);
        throw new Error(err);
      }
    },

    async getPost(_, { postId }) {
      const { errors, valid } = validatePostID(postId);
      if (!valid) {
        throw new UserInputError("postId incorrect ", { errors });
      }
      try {
        const postDetails = await Post.findById(postId);
        if (!postDetails) {
          errors.general = "Post Not-Found";
          throw new UserInputError("post Not-Found ", { errors });
        }
        return postDetails;
      } catch (err) {
        console.log(` An error as occurred while fetching the posts ${JSON.stringify(err)} `);
        throw new Error(err);
      }
    },
  },
};
