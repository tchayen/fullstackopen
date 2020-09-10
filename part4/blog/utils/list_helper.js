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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
