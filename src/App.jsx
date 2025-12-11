import React, { useState } from "react";
import Landing from "./components/Landing";

import Home from "./components/Home";
import Login from "./components/LoginUi";

function App() {
  const [pageWise, setPageWise] = useState("landing");
  const [user, setUser] = useState(null);

  const goToLogin = () => setPageWise("login");
  const goToHome = (email) => {
    setUser({ email });
    setPageWise("home");
  };

  const logout = () => {
    setUser(null);
    setPageWise("landing");
  };

  return (
    <>
      {pageWise === "landing" && <Landing onStart={goToLogin} />}

      {pageWise === "login" && (
        <div className="app-root">
          <Login onLogin={goToHome} />
        </div>
      )}
      {pageWise === "home" && <Home user={user} onLogout={logout} />}
    </>
  );
}

export default App;
