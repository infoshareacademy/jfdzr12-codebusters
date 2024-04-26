import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Header } from './components/structure/Header/Header';
import { Welcome } from './components/page/Welcome/Welcome';
import { AddEntry } from './components/page/AddEntry/AddEntry'
import { Footer } from './components/structure/Footer/Footer';
import { ModeProvider } from './providers/mode';
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
import { Registration } from './components/page/Registration/Registration';
import { Login } from './components/page/Login/Login';
import { RegistrationSuccess } from './components/page/RegistrationSuccess/RegistrationSuccess';
import { useCurrentUser } from './providers/currentUser';

function App(): JSX.Element {
  const user = useCurrentUser();

  return (
    <>
      <ModeProvider>
        <HashRouter>
          <Header user={user} />
          <ScrollToTop>
            <Routes>
              {!user &&
                <>
                  <Route path="/" element={<Welcome />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/confirm-delete" element={<ConfirmDelete />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
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
                  <Route path="/registration-success" element={<RegistrationSuccess />} />
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
