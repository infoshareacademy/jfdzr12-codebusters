import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Header } from './components/structure/Header/Header';
import { Main } from './components/page/Main/Main';
import { Entry } from './components/page/Entry/Entry';
import { Footer } from './components/structure/Footer/Footer';
import { ModeProvider } from './providers/mode';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase-config';
import { Welcome } from './components/page/Welcome/Welcome';

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <ModeProvider>
        <HashRouter>
          <Header user={user} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/entry" element={<Entry />} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
          <Footer />
        </HashRouter>
      </ModeProvider>
    </>
  );
}

export default App;
