const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let totalLikes = 0
    blogs.forEach((blog) => {
        totalLikes += blog.likes;
    })
    return totalLikes;
}

const favouriteBlogs = (blogs) => {
    if (blogs.length === 0) return 0;
    return blogs.reduce((max, obj) => obj.likes > max.likes ? obj : max);
}

module.exports = {
    dummy, totalLikes, favouriteBlogs
}