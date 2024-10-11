// Hooks 
import { useState } from 'react'
import { useField } from './hooks'
// import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useMatch, useNavigate } from 'react-router-dom'
// Styles 
import "./App.css"


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to={'/'}>Acecdotes</Link>
      <Link style={padding} to={'/createnew'}>Create New</Link>
      <Link style={padding} to={'/about'}>About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul style={{ display: 'flex', flexDirection: 'column' }}>
      {anecdotes.map(anecdote => <Link
        to={`/anecdote/${anecdote.id}`} key={anecdote.id}>{anecdote.content}</Link>)}
    </ul>
  </div>
)

const SingleAnecdote = ({ anecdote }) => {
  const { id } = useParams();
  console.log(id);
  console.log(anecdote);


  return (
    <div>
      <h2>Anecdote</h2>
      <h3>"{anecdote.content}"</h3>
    </div>
  );
};



const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div
    style={{ marginTop: "50px" }}>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)


//////// CREAT EEW ANECDOTE START

const CreateNew = (props) => {
  const navigate = useNavigate();
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleClearFields = () => { 
    content.clear();
    author.clear();
    info.clear();
  }

  //////// CREAT EEW ANECDOTE FINISH

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <div>
          author
          <input {...author.input} />
        </div>
        <div>
          url for more info
          <input {...info.input} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleClearFields}>Clear Fields</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(false)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(true)
    setTimeout(() => {
      setNotification(false);
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }


  const match = useMatch('/anecdote/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  return (
    <>

      {notification && (
        <div className='Notification'>
          Anecdote Sucesfully added
        </div>
      )}

      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} notification={notification} />} />
        <Route path="/anecdote/:id" element={<SingleAnecdote anecdote={anecdote} />} />
        <Route path="/about" element={<About />} />
        <Route path="/createnew" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
