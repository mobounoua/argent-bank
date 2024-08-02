import './App.css';
import Home from '../src/pages/Home'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/header/Header";
import Footer from './components/footer/footer';
import SignIn from './pages/Sign-in';
import User from './pages/User'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Provider store={store} >
      <Router >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute> } />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
