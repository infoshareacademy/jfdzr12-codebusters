import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Header } from './components/structure/Header/Header';
<<<<<<< HEAD
import { Main } from './components/page/Main/Main';
import { Entry } from './components/page/Entry/Entry';
=======
import { Welcome } from './components/page/Welcome/Welcome';
import { Entry } from './components/page/Entry/Entry'
>>>>>>> main
import { Footer } from './components/structure/Footer/Footer';
import { ModeProvider } from './providers/mode';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase-config';
<<<<<<< HEAD
import { Welcome } from './components/page/Home/home';
=======
import { NotFound } from './components/page/NotFound/NotFound';
>>>>>>> main

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
<<<<<<< HEAD
            <Route path="/" element={<Main />} />
            <Route path="/entry" element={<Entry />} />
            <Route path="/home" element={<Home />} />
=======
            {!user && <Route path="/" element={<Welcome />} />}
            {user && <Route path="/entry" element={<Entry />} />}
            <Route path="*" element={<NotFound />} />
>>>>>>> main
          </Routes>
          <Footer />
        </HashRouter>
      </ModeProvider>
    </>
  );
}

export default App;
