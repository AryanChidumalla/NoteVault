import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Dashboard";
import ErrorPage from "./Pages/Error/ErrorPage";
import Register from "./Pages/Auth/Register";

import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/context";
import { LoadingScreen } from "./Components/loading/LoadingScreen";

function App() {
  const { currentUser } = useContext(AuthContext);

  const AfterLogIn = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/register" />;
    }
    return children;
  };

  const BeforeLogIn = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  console.log(currentUser);

  if (currentUser === undefined) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <AfterLogIn>
              <Dashboard />
            </AfterLogIn>
          }
        />
        <Route
          path="/register"
          element={
            <BeforeLogIn>
              <Register />
            </BeforeLogIn>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
