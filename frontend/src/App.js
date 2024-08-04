import './App.css';
import LandingPage from "./pages/landingPage"
import HomePage from "./pages/homePage"
import AuthPage from './pages/authPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotifyToast from './components/notifyToast';
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector((state) => state.user);

  const LoginRouteProtection = () => {
    return user.isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />
  }

  const LogoutRouteProtection = () => {
    return !user.isLoggedIn ? <Outlet /> : <Navigate to="/home" />
  }

  return (
    <Router>
      <div className="App">
        <NotifyToast />
        <Routes>
          <Route index element={<LandingPage />}></Route>
          <Route element={<LogoutRouteProtection />}>
            <Route path='/auth/*' element={<AuthPage />}></Route>
          </Route>
          <Route element={<LoginRouteProtection />}>
            <Route path='/home/*' element={<HomePage />} ></Route>
          </Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
