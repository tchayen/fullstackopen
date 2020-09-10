const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((a, b) => a + b, 0);
};

const favoriteBlog = (blogs) => {
  const sorted = blogs.sort((a, b) => b.likes - a.likes);
  return sorted[0];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  const authorToCount = {};

  blogs.forEach((blog) => {
    if (authorToCount[blog.author]) {
      authorToCount[blog.author] += 1;
    } else {
      authorToCount[blog.author] = 1;
    }
  });

  const sorted = Object.entries(authorToCount).sort((a, b) => b[1] - a[1]);

  return {
    author: sorted[0][0],
    blogs: sorted[0][1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
