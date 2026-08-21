const logger = require("./logger");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLike = blogs.reduce((sum, item) => sum + item.likes, 0);
  return totalLike;
};

const favoriteBlog = (blogs) => {
  let [mostLikedIndex, count] = [0, 0];

  blogs.map((item, index) => {
    if (item.likes > count) {
      count = item.likes;
      mostLikedIndex = index;
    }
  });
  return blogs[mostLikedIndex];
};

const mostBlogs = (blogs) => {
  const authors = [];
  blogs.forEach((blog) => {
    const existingAuthor = authors.find(
      (author) => author.author === blog.author,
    );
    if (existingAuthor) {
      existingAuthor.blogs += 1;
    } else {
      authors.push({ author: blog.author, blogs: 1 });
    }
  });

  authors.sort((a, b) => b.blogs - a.blogs);
  return authors[0];
};

const mostLikes = (blogs) => {
  const authors = [];
  blogs.forEach((blog) => {
    const existingAuthor = authors.find(
      (author) => author.author === blog.author,
    );
    if (existingAuthor) {
      existingAuthor.likes += blog.likes;
    } else {
      authors.push({ author: blog.author, likes: blog.likes });
    }
  });

  authors.sort((a, b) => b.likes - a.likes);
  return authors[0];
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
