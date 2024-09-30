import { useState, useEffect } from 'react'
import { Blog } from './componenets/Blog'
import blogService from './services/Blogs'
// Styles 
import "./App.css"
// ompoenents 
import { NewBlogForm } from './componenets/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const [failLogin, setFailLogin] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);
  const [successPost, setSuccessPost] = useState(false);

  const [isCreateFormShowing, setIsCreateFormShowing] = useState(false)


  useEffect(() => {
    const lsuser = localStorage.getItem('username')
    const lsjwt = localStorage.getItem('token')
    console.log(lsuser, lsjwt)
    setUser(lsuser)
    setJwt(lsjwt)
  }, [])



  useEffect(() => {
    if (jwt) {
      blogService.getAll(jwt).then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [jwt])


  // Log in ////////
  // State 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Handlers
  const handleChanegUsername = (e) => {
    setUsername(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  // Handle log in SUBMIT
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await blogService.login(username, password);
      console.log(data);

      // Set the user data and store it in localStorage
      setUser(data.username);
      setJwt(data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('token', data.token);
      setSuccessLogin(true)
      setTimeout(() => {
        setSuccessLogin(false)
      }, 2000)
    } catch (error) {
      // Handle the error (e.g., show a message to the user, log the error)
      console.error('Login failed:', error.response?.data || error.message);
      setFailLogin(true)
    }
  };
  ///////////////////
  const logout = () => {
    setUser(null)
    setJwt(null)
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }



  ////// New Blog /////
  // States 
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  // Hanldres 
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleChanegURL = (e) => {
    setUrl(e.target.value);
  }

  const submitNewBlog = async (e) => {
    e.preventDefault();
    console.log(title, url);

    try {
      // Try to post a new blog
      const data = await blogService.postNewBlog(jwt, title, url);
      console.log('New blog posted:', data);

      // Fetch the updated list of blogs after successfully posting the new one
      const blogs = await blogService.getAll(jwt);
      setBlogs(blogs);

      setSuccessPost(true)
      setTimeout(() => {
        setSuccessPost(false)
      }, 2000)

    } catch (error) {
      // Handle any error that occurs during blog creation or fetching
      console.error('Error posting new blog or fetching blogs:', error.response?.data || error.message);
    }
  };


  //////////////////////





  // RETURN JSX

  if (!user) {


    return (

      <div className='App'>

        {failLogin && (
          <div className='Fail'>
            Login Credentials incorrect
          </div>
        )}

        <div className='Login'>
          Please log in to see blogs
          <form
            onSubmit={handleSubmitLogin}>

            <input
              value={username}
              onChange={handleChanegUsername}
              placeholder='Username'
              minLength={3}
              required />

            <input
              value={password}
              onChange={handleChangePassword}
              placeholder='Password'
              minLength={3}
              required />

            <button
              type='submit'>
              Login
            </button>

          </form>
        </div>
      </div>
    )



  } else {


    return (

      <div className='App'>

        {successPost && (
          <div className='Success-Post'>
            Good job submitting that Post buddy!
          </div>
        )}

        {successLogin && (
          <div className='Success'>
            Yay! you logged in!
          </div>
        )}


        <div className='Home'>

          <button onClick={logout}>
            Log out
          </button>
          <h1> Hello, {user}</h1>

          <h2>blogs</h2>

          <NewBlogForm isCreateFormShowing={isCreateFormShowing} submitNewBlog={submitNewBlog} title={title} handleChangeTitle={handleChangeTitle} url={url} handleChanegURL={handleChanegURL} setIsCreateFormShowing={setIsCreateFormShowing}/>

          {blogs.map(blog =>
            <Blog
            key={blog.id}
            blog={blog} />
          )}

        </div>

      </div>
    )
  }


}

export default App