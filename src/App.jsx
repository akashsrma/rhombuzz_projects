import React, { useState } from "react";
import Landing from "./components/Landing";
import Login from "./components/LoginUi";
import Navbar from "./components/Navbar";

function App() {
  const [pageWise, setPageWise] = useState("landing");
  const [user, setUser] = useState(null);

  const goToLogin = () => setPageWise("login");
  const goToHome = (email) => {
    setUser({ email });
    setPageWise("navbar");
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
      {pageWise === "navbar" && <Navbar user={user} onLogout={logout} />}
    </>
  );
}

export default App;
