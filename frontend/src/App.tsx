import React from "react";
import { AuthProvider, useAuth } from "./http/Auth/auth-context";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./Components/Routes/Router";

export default function App() {
  const { user, loading, error, login, loggedIn, logout, setSession, session, signUp } = useAuth();

  console.log("loggedin: ", loggedIn);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <MyRouter />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
