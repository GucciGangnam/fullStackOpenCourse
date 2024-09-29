import { useState, useEffect } from 'react'
import Blog from './componenets/Blog'
import blogService from './services/Blogs'
// Styles 
import "./App.css"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);


  useEffect(() => { 
    const lsuser = localStorage.getItem('username')
    const lsjwt = localStorage.getItem('token')
    console.log(lsuser, lsjwt)
    setUser(lsuser)
    setJwt(lsjwt)
  },[])



  useEffect(() => {
    if (jwt){ 
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
  const hanldeSubmitLogin = async (e) => {
    e.preventDefault();
    const data = await blogService.login(username, password)
    console.log(data)
    setUser(data.username)
    setJwt(data.token)
    localStorage.setItem('username', data.username)
    localStorage.setItem('token', data.token)
  }
  ///////////////////
  const logout = () => {
    setUser(null)
    setJwt(null)
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }

  // RETURN JSX

  if (!user) {


    return (
      <div className='Login'>
        Please log in to see blogs
        <form
          onSubmit={hanldeSubmitLogin}>

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
    )



  } else {


    return (
      <div>
        <button onClick={logout}>
          Log out 
          </button>
          <h1> Hello, {user}</h1>

        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )



  }


}

export default App