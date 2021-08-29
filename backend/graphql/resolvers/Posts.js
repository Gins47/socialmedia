const Post = require("../../models/Post");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        console.log(` An error as occurred while fetching the posts ${JSON.stringify(err)} `);
        throw new Error(err);
      }
    },
  },
};
