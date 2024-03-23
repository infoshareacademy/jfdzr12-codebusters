import { useState } from 'react'
import './App.css'
import { Main } from './components/page/Main/Main'

function App() {
  const [count, setCount] = useState(null)

  return (
    <>
      <Main></Main>
    </>
  )
}

export default App
