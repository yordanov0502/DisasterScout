import React, { useState } from 'react';
import "./reset_password_component.scss";
import EmailIcon from '@mui/icons-material/Email';

export const ResetPasswordComponent = () => { //? pri natisnat button enter
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPressResetPassword = (event) => {
    event.preventDefault(); //???
    //purvo validira prazni poleta/regex
    //posle validira dali ima potrbitel s takiva danni
  };
       //!regex proverkite za username v JS ne poddurjat predvaritelni proverki dali string moje da zapochva ili svurshva s daden symbol
  return (
    <div className="component">
      <div className="reset-password">
      <div className="img"></div>
        <form onSubmit={onPressResetPassword}>
        <div className="text-between">
           Моля въведете вашия имейл адрес. 
           Ще получите имейл с нова парола и инструкции. 
           {/* След като възстановите достъпа до вашия профил, е желателно да промените паролата си.  */}
        </div>
        <div className="email-field">
            <EmailIcon className={`email-icon ${email && 'active'}`}/>
            <input 
              id="email" 
              name="email" 
              type="email"
              placeholder="Имейл адрес"
              //autoComplete="email" //???
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