const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    let likesCount = 0
    for (let i = 0; i < blogs.length; i++) {
      likesCount += blogs[i].likes
    }
    return likesCount
  }
}

module.exports = {
  dummy,
  totalLikes
}