const Post = require("../../models/Post");
const { validatePostID } = require("../../utils/validators");

const { authVerification } = require("../../utils/jwt");
const { UserInputError, AuthenticationError } = require("apollo-server");
module.exports = {
  Query: {
    /**
     * Find all the post
     * @returns
     *
     */
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
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
  Mutation: {
    async createPost(_, { body }, context) {
      const user = authVerification(context);
      console.log(` User = ${JSON.stringify(user)}`);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
    /**
     *
     * @param {*} _
     * @param {*} param1
     * @param {*} context
     * @returns
     */
    async deletePost(_, { postId }, context) {
      const user = authVerification(context);
      console.log(` User in delete = ${JSON.stringify(user)}`);
      try {
        const post = await Post.findById(postId);
        if (post) {
          if (post.username === user.username) {
            await post.delete();
            return "Post deleted";
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else {
          throw new Error(" Post NotFound");
        }
      } catch (err) {
        console.log(`error = ${err}`);
        throw new Error(err);
      }
    },
  },
};
