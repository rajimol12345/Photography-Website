import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/variables.css';
import './styles/global.css';
import './styles/layout.css';
// import './styles/style.css'; // Commented out to prefer Tilia styles
import { AuthProvider } from './context/AuthContext.jsx'; // Import AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
