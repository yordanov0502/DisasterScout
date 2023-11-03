import React from 'react';
import "./login_component.scss";

export const LoginComponent = () => {
  return (
    <div className="component">
    <div className="login">
      <div className="h1"></div>
      <form /*onSubmit={handleLogin}*/>
      <input 
        //pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" 
        placeholder="Потребителско име" 
        id="username" 
        name="username" 
        type="text"
        autoComplete="current-username" //?????????????????????????????????????
      />
      <input 
        placeholder="Парола" 
        id="password" 
        name="password" 
        type="password"
        autoComplete="current-password" //??????????????????????????????????
      />
      <input 
        value="Вход" 
        className="btn" 
        type="submit"
      />
      </form>
    </div>
    </div>
  );
};