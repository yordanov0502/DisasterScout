import React from 'react';
import "./login.scss";

export const Login =()=>{
  return (
    <div className="container">
    <div className="login wrap">
      <div className="h1">Вход</div>
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
        value="Login" 
        className="btn" 
        type="submit"
      />
      </form>
    </div>
    </div>
  );
};