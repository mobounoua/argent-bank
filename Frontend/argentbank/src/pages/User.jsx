import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername, userProfile } from '../redux/userSlice';
import './user.css';

const User = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const firstName = useSelector ((state) => state.user?.firstName)
    const lastName = useSelector ((state) => state.user?.lastName)
    const userName = useSelector ((state) => state.user?.userName)
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    useEffect(() => {
        if (token) {
            dispatch(userProfile(token));
        }
    }, [token, dispatch]);

    // action au clic sur Edit Name
    const handleEditClick = () => {
        setIsEditing(true);
    };
    // action au clic sur Save
    const handleSaveClick = () => {
        if (newUsername !== userName) {
            dispatch(updateUsername({userName : newUsername })).then(() => {
                setIsEditing(false);
            });
        } else {
            setIsEditing(false);
        }
    };
    // action au clic sur cancel
    const handleCancelClick = () => {
        setIsEditing(false);
        setNewUsername(userName || '');
    };

    return(
        <main className="main bg-dark2">
          <div className="header">
            <h1>Welcome back<br />{firstName}</h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </div>
          {/* Edit Name Form */}
          {isEditing && (
              <section className="edit-form">
                  <h2>Edit User Info</h2>
                  <form className='form-user' > 
                      <div className="input-wrapper">
                          <label htmlFor="username">Username</label>
                          <input
                              type="text"
                              id="username"
                              value = {newUsername}
                              onChange={(e) => setNewUsername(e.target.value)}                          
                          />
                      </div>
                      <div className="input-wrapper">
                          <label htmlFor="firstName">First Name</label>
                          <input
                              type="text"
                              id="firstName"
                              value={firstName}
                              disabled
                              aria-label='firstName'
                          />
                      </div>
                      <div className="input-wrapper">
                          <label htmlFor="lastName">Last Name</label>
                          <input
                              type="text"
                              id="lastName"
                              value={lastName}
                              disabled
                              aria-label='lastName'
                          />
                      </div>
                      <div className="form-buttons">
                          <button className="edit-button" type="button" onClick={handleSaveClick}>
                              Save
                          </button>
                          <button className='edit-button' type="button" onClick={handleCancelClick}>
                              Cancel
                          </button>
                      </div>
                  </form>
              </section>
            )}
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </main>
    )
  }
  export default User