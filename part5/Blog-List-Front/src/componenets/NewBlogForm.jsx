// IMPORTS 


export const NewBlogForm = ({
    isCreateFormShowing,
    submitNewBlog,
    title,
    handleChangeTitle,
    url,
    handleChangeURL, // Corrected typo
    setIsCreateFormShowing,
}) => {
    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        submitNewBlog(); // Call the submit handler
    };

    return (
        <div className="NewBlogForm">
            {isCreateFormShowing ? (
                <div className="New-Blog">
                    Create a new blog
                    <form onSubmit={handleSubmit} data-testid="new-blog-form"> {/* Added data-testid */}
                        <input
                            value={title}
                            onChange={handleChangeTitle}
                            placeholder="Title"
                            data-testid="title-input" // Added data-testid
                        />
                        <input
                            value={url}
                            onChange={handleChangeURL} // Corrected typo
                            placeholder="URL"
                            data-testid="url-input" // Added data-testid
                        />
                        <button type="submit">Add</button>
                        <button
                            type="button" // Added type="button" to prevent form submission
                            onClick={() => { setIsCreateFormShowing(false); }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                <button onClick={() => { setIsCreateFormShowing(true); }}>
                    Add New Blog
                </button>
            )}
        </div>
    );
};