import React from 'react';
import './App.css';
import { Routes, Route} from "react-router-dom"
import LayoutNotAuthorized from "./pages/LayoutNotAuthorized"
import LayoutBackend from "./pages/LayoutBackend"
import Backend from "./pages/Backend"
import Register from './components/Authentication/Register';
import LoginMui from './components/Authentication/LoginMui';
import Example from './pages/Example';
import { RequireAuthRoute } from './common/RequireAuthRoute';
import Hello from './pages/Hello';
import PersistLogin from './components/Authentication/PersistLogin';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LayoutNotAuthorized />}> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginMui />} /> 
        <Route path="/*" element={<Example/>} />
      </Route>
      <Route element={<PersistLogin/>}>
        <Route element={<RequireAuthRoute />}>
          <Route path="/" element={<LayoutBackend />}> 
            <Route path="/backend" element={<Backend />} />
            <Route path="/hello" element={<Hello/>} />
            <Route path="/example" element={<Example/>} />
            <Route path="/*" element={<Example/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
