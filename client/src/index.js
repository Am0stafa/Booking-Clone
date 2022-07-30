import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter
} from "react-router-dom";
import {SearchContextProvider} from './context/SearchContext'
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
          <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
</BrowserRouter>
);
