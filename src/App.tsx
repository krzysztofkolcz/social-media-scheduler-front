import React from 'react';
import './App.css';
import LoginMui from './components/Authentication/LoginMui';
import Status from './components/Authentication/Status';
import useAccount from "./hooks/useAccount";

function App() {

  const { isLoggedIn } = useAccount();
  console.log("App Is logged in:"+isLoggedIn);
  return (
    <div className="App">
      <Status />
      <LoginMui />
    </div>
  );
}

export default App;
