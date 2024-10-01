// IMPORTS 
// React
import { useState, useEffect } from "react"
// Services 
import blogService from '../services/Blogs'



// COMPONENT

export const Blog = ({ blog, setBlogs }) => {

    // States 
    const [isBlogShowing, setIsBlogShowing] = useState(false);

    // Handlers 
    const handleIncrementLike = async (id) => {
        const jwt = localStorage.getItem('token');
        console.log(id);
        try {
            // Await the incrementLike call
            await blogService.incrementLike(id);

            // Fetch the updated list of blogs
            const blogs = await blogService.getAll(jwt);
            setBlogs(blogs);
        } catch (error) {
            console.error(error);
            console.log('Failed to increment like');
        }
    };

    const deleteBlog = async (id) => {
        const jwt = localStorage.getItem('token');
        console.log(id);
    
        // Show confirmation dialog
        const confirmed = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmed) {
            return; // Exit the function if the user cancels
        }
    
        try {
            // Await the deleteBlog call
            await blogService.deleteBlog(id);
    
            // Fetch the updated list of blogs
            const blogs = await blogService.getAll(jwt);
            setBlogs(blogs);
        } catch (error) {
            console.error(error);
            console.log('Failed to delete blog');
        }
    };

    return (
        <div className="Blog">

            <p>Name: {blog.title}</p>
            {!isBlogShowing ? (
                <button onClick={() => { setIsBlogShowing(true) }}>Show Blog</button>
            ) : (
                <>
                    <p>Author: {blog.author}</p>
                    <p>URL: {blog.url} </p>
                    <p>Likes: {blog.likes}</p><button onClick={() => { handleIncrementLike(blog.id) }}>Like</button>
                    <button onClick={() => { deleteBlog(blog.id)}}>Delete Blog</button>
                    <button onClick={() => { setIsBlogShowing(false) }}>Hide Blog</button>
                </>
            )}

        </div>
    )
}

