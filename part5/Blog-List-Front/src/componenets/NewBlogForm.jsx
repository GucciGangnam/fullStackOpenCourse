// IMPORTS 


// COMPONENT
export const NewBlogForm = ({isCreateFormShowing, submitNewBlog, title, handleChangeTitle, url, handleChanegURL, setIsCreateFormShowing }) => {
    return (
        <div className="NewBlogForm">


            {isCreateFormShowing ? (
                <div className='New-Blog'>
                    Create a new blog
                    <form onSubmit={submitNewBlog}>
                        <input
                            value={title}
                            onChange={handleChangeTitle}
                            placeholder='Title' />
                        <input
                            value={url}
                            onChange={handleChanegURL}
                            placeholder='URL' />
                        <button type='submit'>Add</button>
                        <button
                            onClick={() => { setIsCreateFormShowing(false) }}>Cancel</button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => { setIsCreateFormShowing(true) }}
                >Add New Blog</button>
            )}








        </div>
    )
}