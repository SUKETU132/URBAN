import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import authService from './MongoDB/auth';
import { login, logout } from './store/authSlice';
import { useDispatch } from 'react-redux';
import { useGetCartItemQuery } from './store/cartSlice';

function App() {
  const dispatch = useDispatch();
  const { data } = useGetCartItemQuery();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (!userData.notVerified && userData.status) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => { throw error });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
