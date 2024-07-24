import './App.css';
import LandingPage from "./pages/landingPage"
import HomePage from "./pages/homePage"
import AuthPage from './pages/authPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<LandingPage />}></Route>
          <Route path='/auth/*' element={<AuthPage />}></Route>
          <Route path='/home/*' element={<HomePage />} ></Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
