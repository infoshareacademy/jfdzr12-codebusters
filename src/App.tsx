import './App.css'
import { Routes, Route, HashRouter } from "react-router-dom";
import { Header } from './components/structure/Header/Header'
import { Main } from './components/page/Main/Main'
import { ModeProvider } from './providers/mode';

function App() {

  return (
    <>
      <ModeProvider>
        <HashRouter>
          <Header />
          <Main />
          <Routes>

          </Routes>
        </HashRouter>
      </ModeProvider>
    </>
  )
}

export default App
