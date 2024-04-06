import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Header } from './components/structure/Header/Header';
import { Welcome } from './components/page/Welcome/Welcome';
import { Entry } from './components/page/Entry/Entry'
import { Footer } from './components/structure/Footer/Footer';
import { ModeProvider } from './providers/mode';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase-config';
import { NotFound } from './components/page/NotFound/NotFound';
import { Account } from './components/page/Account/Account';
import { ChangePassword } from './components/page/ChangePassword/ChangePassword';
import { ResetPassword } from './components/page/ResetPassword/ResetPassword';
import { DeleteAccount } from './components/page/DeleteAccount/DeleteAccount';
import { ConfirmDelete } from './components/page/ConfirmDelete/ConfirmDelete';

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
            {!user && 
            <>
              <Route path="/" element={<Welcome />} />
              <Route path="/reset-password" element={<ResetPassword user={user} />} />
              <Route path="/confirm-delete" element={<ConfirmDelete />} />
            </>
            }
            {user &&
              <>
                <Route path="/entry" element={<Entry user={user} />} />
                <Route path="/account" element={<Account user={user} />} />
                <Route path="/change-password" element={<ChangePassword user={user} />} />
                <Route path="/delete-account" element={<DeleteAccount user={user} />} />
                
              </>
            }
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </HashRouter>
      </ModeProvider>
    </>
  );
}

export default App;
