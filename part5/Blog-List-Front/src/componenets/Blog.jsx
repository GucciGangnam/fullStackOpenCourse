// IMPORTS 
// React
import { useState, useEffect } from "react"



// COMPONENT

export const Blog = ({ blog }) => {

    // States 
    const [isBlogShowing, setIsBlogShowing] = useState(false);

    return (
        <div className="Blog">

            <p>Name: {blog.title}</p>
            {!isBlogShowing ? (
                <button onClick={() => {setIsBlogShowing(true)}}>Show Blog</button>
            ) : (
                <>
                    <p>Author: {blog.author}</p>
                    <p>URL: {blog.url} </p>
                    <p>Likes: {blog.likes}</p><button>Like</button>
                    <button onClick={() => {setIsBlogShowing(false)}}>Hide Blog</button>
                </>
            )}





        </div>
    )
}

