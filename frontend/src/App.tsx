import React from "react";
import { AuthProvider, useAuth } from "./http/Auth/auth-context";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./Components/Routes/Router";
import { PlantsProvider } from "./Components/PlantsContext";

export default function App() {
  const { loggedIn } = useAuth();

  console.log("loggedin: ", loggedIn);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <PlantsProvider>
            <MyRouter />
          </PlantsProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
