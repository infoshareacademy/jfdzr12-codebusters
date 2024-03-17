import './App.css'
import { Routes, Route, HashRouter } from "react-router-dom";
import { Header } from './components/structure/Header'

function App() {

  return (
    <>
      <HashRouter>
        <Header />
        <Routes>

        </Routes>
      </HashRouter>
    </>
  )
}

export default App
