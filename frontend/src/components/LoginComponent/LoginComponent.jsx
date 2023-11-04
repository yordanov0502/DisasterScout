import React from 'react';
import "./login_component.scss";

const handleLogin = (event) => {
  event.preventDefault(); // Prevent the default form submit action if using a submit button
  console.log('Button clicked!');
  // You can add more logic here for what happens when the button is clicked
};

export const LoginComponent = () => {
  return (
    <div className="component">
    <div className="login">
      <div className="img"></div>
      <form onSubmit={handleLogin}>
      <input 
        //pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" 
        id="username" 
        name="username" 
        type="text"
        placeholder="Потребителско име" 
        autoComplete="current-username" //?????????????????????????????????????
      />
      <input 
        id="password" 
        name="password" 
        type="password"
        placeholder="Парола" 
        autoComplete="current-password" //??????????????????????????????????
      />
      <input 
        value="Вход"        
        type="submit"
      />
      </form>
    </div>
    </div>
  );
};