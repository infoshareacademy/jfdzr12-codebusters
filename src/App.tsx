import './App.css'
import { Routes, Route, HashRouter } from "react-router-dom";
import { Header } from './components/structure/Header/Header'
import { Main } from './components/page/Main/Main'
import { Footer } from './components/structure/Footer/Footer';
import { ModeProvider } from './providers/mode';

function App() {

  return (
    <>
      <ModeProvider>
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />}> </Route>
          </Routes>
          <Footer />
        </HashRouter>
      </ModeProvider>
    </>
  )
}

export default App
