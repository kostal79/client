import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import "./App.less";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import Disk from "./Disk/Disk";
import Profile from "./Profile/Profile";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(() => {
    auth(dispatch);
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth ? (
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Disk />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Disk />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
