import React, { useState } from 'react';
import "./login_component.scss";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

export const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Button clicked!');
  };
       //!regex proverkite za username v JS ne poddurjat predvaritelni proverki dali string moje da zapochva ili svurshva s daden symbol
  return (
    <div className="component">
      <div className="login">
        <div className="img"></div>
        <form onSubmit={handleLogin}>
          <div className="username-field">
            <PersonIcon className={`username-icon ${username && 'active'}`}/>
            <input 
              id="username" 
              name="username" 
              type="text"
              placeholder="Потребителско име"
              autoComplete="username" //???
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="password-field">
            <LockIcon className={`password-icon ${password && 'active'}`}/>
            <input 
              id="password" 
              name="password" 
              type="password"
              placeholder="Парола"
              autoComplete="current-password" //???
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <a href="/reset-password" className="forgot-password">Забравена парола?</a>
          <input value="Вход" type="submit"/>
        </form>
      </div>
    </div>
  );
};