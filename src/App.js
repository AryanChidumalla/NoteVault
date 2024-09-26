import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Dashboard";
import ErrorPage from "./Pages/Error/ErrorPage";
import Register from "./Pages/Auth/Register";

import "./App.css";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./Components/loading/LoadingScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseInit";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./Redux/Actions/authAction";

function App() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      const unsubscribe = await onAuthStateChanged(auth, (user) => {
        if (user) dispatch(setUser(user));
        else dispatch(clearUser());
        setLoading(false);
      });

      return () => unsubscribe();
    };

    checkAuthStatus();
  }, [dispatch]);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/register" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
