import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Header } from './components/structure/Header/Header';
import { Main } from './components/page/Main/Main';
import { Footer } from './components/structure/Footer/Footer';
import { ModeProvider } from './providers/mode';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase-config';

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
          <Header setUser={setUser} user={user} />
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
          <Footer />
        </HashRouter>
      </ModeProvider>
    </>
  );
}

export default App;
