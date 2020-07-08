const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  reducer = (likes, blog) => {
    return likes + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return null
  }
  return _.maxBy(blogs, (blog) => blog.likes)
}

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return null
  }
  const blogCount = _.countBy(blogs, (blog) => blog.author)
  const maxAuthor = _.maxBy(Object.keys(blogCount), (k) => blogCount[k])
  return maxAuthor
}

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return null
  }
  const reducer = (result, blog) => {
    if (result[blog.author]) {
      result[blog.author] += blog.likes
    } else {
      result[blog.author] = blog.likes
    }
    return result
  }
  const likeCount = blogs.reduce(reducer, {})
  console.log(likeCount)
  const maxAuthor = _.maxBy(Object.keys(likeCount), (k) => likeCount[k])
  return maxAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
