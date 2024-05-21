import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  BrowserRouter,
  Routes,
  Route 
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './pages/ErrorPage';
import Backend from './pages/Backend';
import { Provider } from 'react-redux'
import { store } from './store'
import Register from './components/Authentication/Register';
import LoginMui from './components/Authentication/LoginMui';
import './i18n';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import {  teal } from '@mui/material/colors';
import ChangePassword from './components/Authentication/ChangePassword';
import { Auth } from './components/Authentication/Auth';
import { ProtectedRoute } from './common/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />
    
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <LoginMui />,
  },
  {
    path: "/changepass",
    element: <ProtectedRoute><ChangePassword/></ProtectedRoute>,
  },
  {
    path: "/backend",
    element: <ProtectedRoute><Backend /></ProtectedRoute>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      // main: blueGrey[500],
      main: teal[600],
    },
    secondary: {
      main: '#f44336',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {

        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  },
});


root.render(
  // <React.StrictMode>
  //   <Account>
  //     <Provider store={store}>
  //       <ThemeProvider theme={theme}>
  //         <RouterProvider router={router} />
  //       </ThemeProvider>
  //     </Provider>
  //   </Account>
  // </React.StrictMode>

  <React.StrictMode>
    <Auth>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />}/>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </Auth>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
