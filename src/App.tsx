import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Header } from './components/structure/Header/Header';
import { Welcome } from './components/page/Welcome/Welcome';
import { Home } from './components/page/Home/home';
import { Entry } from './components/page/Entry/Entry'
import { Footer } from './components/structure/Footer/Footer';
import { ModeProvider } from './providers/mode';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase-config';
import { NotFound } from './components/page/NotFound/NotFound';

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
            {!user && <Route path="/" element={<Welcome />} />}
            {user && <Route path="/entry" element={<Entry />} />}
            {user && <Route path="/home" element={<Home />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </HashRouter>
      </ModeProvider>
    </>
  );
}

export default App;
