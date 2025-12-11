import React, { useState } from "react";
import Landing from "./components/Landing";
import Login from "./components/LoginUi";
import Navbar from "./components/Navbar";
import SidebarPage from "./components/LeftSideBar";
function App() {
  const [pageWise, setPageWise] = useState("landing");
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState({
    id: 1,
    label: "Home",
  });

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

      {pageWise === "navbar" && (
        <>
          {/* Top Navbar */}
          <Navbar user={user} onLogout={logout} />

          {/* below sidebar left side */}
          <div
            style={{
              display: "flex",
              height: "calc(100vh - 50px)",
            }}
          >
            {/* sidebar */}
            <SidebarPage
              initialSelected={selectedTab.id}
              onSelectTab={(tab) => setSelectedTab(tab)}
            />

            {/* main content */}
            <main
              style={{
                flex: 1,
                padding: "32px",
                overflowY: "auto",
              }}
            >
              <h1 style={{ fontSize: "32px", fontWeight: "700" }}>
                {selectedTab.label} starting showing
              </h1>

              <p style={{ fontSize: "16px", marginTop: "4px" }}>
                Put the details for <strong>{selectedTab.label}</strong> here.
              </p>
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default App;
