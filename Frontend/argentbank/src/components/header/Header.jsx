
import { Link } from 'react-router-dom';
import logo from '../../assets/img/argentBankLogo.png'
import './header.css'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const Header = () => {
  const token = useSelector((state) => state.auth.token); // Récupère le token d'authentification
  const userName = useSelector((state) => state.user.userName); // Récupère le nom d'utilisateur
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {
          token? (
            <>
            <div className='nav-user'>
                <Link className="main-nav-user" to="/user">
                  <i className="fa fa-user-circle"></i> 
                  {userName}
                </Link>
                <Link className="main-nav-item" to="/" onClick={handleLogout}>
                  <i className="fa fa-sign-out"></i>
                  Sign Out
                </Link>
            </div>
            </>
          ):(
            <Link className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )
        }
        
      </div>
    </nav>
  );
}

export default Header;