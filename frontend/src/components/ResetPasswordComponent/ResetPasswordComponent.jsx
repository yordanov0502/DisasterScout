import React, { useState } from 'react';
import "./reset_password_component.scss";
import EmailIcon from '@mui/icons-material/Email';

export const ResetPasswordComponent = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    console.log('Button clicked!');
  };
       //!regex proverkite za username v JS ne poddurjat predvaritelni proverki dali string moje da zapochva ili svurshva s daden symbol
  return (
    <div className="component">
      <div className="reset-password">
      <div className="img"></div>
        
        <form onSubmit={handleResetPassword}>
          <div className="email-field">
             {/* Add a text block here */}
        <div className="text-between">
           Моля въведете вашия имейл адрес. 
           Ще получите имейл с нова парола и инструкции. 
           {/* След като възстановите достъпа до вашия профил, е желателно да промените паролата си.  */}
        </div>
            <EmailIcon className={`email-icon ${email && 'active'}`}/>
            <input 
              id="email" 
              name="email" 
              type="email"
              placeholder="Имейл адрес"
              //autoComplete="username" //???
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <input value="Нова парола" type="submit"/>
        </form>
      </div>
    </div>
  );
};