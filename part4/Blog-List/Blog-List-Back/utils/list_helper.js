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

const mostBlogger = (blogs) => {
    if (blogs.length === 0) return 0;
    const authorCount = blogs.reduce((count, blog) => {
        count[blog.author] = (count[blog.author] || 0) + 1;
        return count;
    }, {});
    const topAuthor = Object.keys(authorCount).reduce((top, author) => {
        return authorCount[author] > top.blogs
            ? { author, blogs: authorCount[author] }
            : top;
    }, { author: '', blogs: 0 });
    return topAuthor;
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return 0;
    const likesCount = blogs.reduce((count, blog) => {
        count[blog.author] = (count[blog.author] || 0) + blog.likes;
        return count;
    }, {});
    const topAuthor = Object.keys(likesCount).reduce((top, author) => {
        return likesCount[author] > top.likes
            ? { author, likes: likesCount[author] }
            : top;
    }, { author: '', likes: 0 });
    return topAuthor;
}


module.exports = {
    dummy, totalLikes, favouriteBlogs, mostBlogger, mostLikes
}