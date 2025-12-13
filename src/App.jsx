import React, { useState } from "react";
import Landing from "./components/Landing";
import Login from "./components/LoginUi";
import Navbar from "./components/Navbar";
import SidebarPage from "./components/LeftSideBar";
import HomePage from "./pages/Home";
import SurveyPage from "./pages/Survey";
import PaymentPage from "./pages/Payment";
import ManageUserPage from "./pages/ManageUser";

const TAB_COMPONENTS = {
  1: <HomePage />,
  2: <SurveyPage />,
  3: <PaymentPage />,
  4: <ManageUserPage />,
};
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
              <p style={{ fontSize: "16px", marginTop: "4px" }}>
                {selectedTab.label === "Home" ? (
                  " "
                ) : (
                  <div className="pageTabs">
                    <strong
                      style={{
                        color: "teal",
                        fontSize: "18px",
                      }}
                    >
                      {" "}
                      {selectedTab.label}{" "}
                    </strong>{" "}
                    : This section is under construction. check back later for
                    updates!
                  </div>
                )}
              </p>
              {TAB_COMPONENTS[selectedTab.id]}
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default App;
