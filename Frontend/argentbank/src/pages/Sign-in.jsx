import './sign-in.css'
import { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);


    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(login({ email, password })).then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                navigate('/user');
            }
        });
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignIn}>
                    <div className="input-wrapper">
                        <label htmlFor="userEmail">User Email </label>
                        <input 
                            type="email" 
                            id="userEmail" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value) } />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    )
}

export default SignIn