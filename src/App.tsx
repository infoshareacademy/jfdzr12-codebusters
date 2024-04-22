import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Header } from './components/structure/Header/Header';
import { Welcome } from './components/page/Welcome/Welcome';
import { AddEntry } from './components/page/AddEntry/AddEntry'
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
import { Home } from './components/page/Home/Home';
import { EditEntry } from './components/page/EditEntry/EditEntry';
import { About } from './components/page/About/About'
import { Contact } from './components/page/Contact/Contact';
import ScrollToTop from './components/atomic/ScrollToTop/ScrollToTop';

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const closeModals = () => {
    setIsUserModalOpen(false);
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutsideModals = (event: MouseEvent) => {
      if (event.target && !(event.target as HTMLElement).closest("#header__account-container") &&
        !(event.target as HTMLElement).closest("#header-nav__list-item-login") &&
        !(event.target as HTMLElement).closest("#modal-header__container")) {
        closeModals();
      }
    };

    document.body.addEventListener("click", handleClickOutsideModals);

    return () => {
      document.body.removeEventListener("click", handleClickOutsideModals);
    };
  }, []);

  return (
    <>
      <ModeProvider>
        <HashRouter>
          <Header user={user} isUserModalOpen={isUserModalOpen} isLoginModalOpen={isLoginModalOpen} setIsUserModalOpen={setIsUserModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
          <ScrollToTop>
            <Routes>
              {!user &&
                <>
                  <Route path="/" element={<Welcome />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/confirm-delete" element={<ConfirmDelete />} />
                </>
              }
              {user &&
                <>
                  <Route path="/" element={<Home user={user} />} />
                  <Route path="/add-entry" element={<AddEntry user={user} />} />
                  <Route path="/edit-entry/:entryId" element={<EditEntry user={user} />} />
                  <Route path="/account" element={<Account user={user} />} />
                  <Route path="/change-password" element={<ChangePassword user={user} />} />
                  <Route path="/delete-account" element={<DeleteAccount user={user} />} />

                </>
              }
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ScrollToTop>
          <Footer user={user} />
        </HashRouter>
      </ModeProvider>
    </>
  );
}

export default App;
