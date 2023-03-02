import React, { useState } from "react";
import "./Navbar.less";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { getFiles, searchFile } from "../../actions/file";
import { showLoader } from "../../redux/slices/appSlice";
import defaultAvatar from "../../assets/images/defaultavatar.svg"

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const currentDir = useSelector((state) => state.file.currentDir)
  const user = useSelector((state) => {state.user.currentUser})

  const searchNameHandler = (event) => {
    
    setSearchName(event.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }

    dispatch(showLoader())
    if (event.target.value !== "") {
      setSearchTimeout(
        setTimeout(([value, dispatch]) => {
          searchFile(value, dispatch);
        }, 500, [event.target.value, dispatch])
      );
    } else {
      getFiles(currentDir, dispatch, "type")
    } 
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__logo">
          <Logo />
        </div>
        <div className="navbar__header">MERN CLOUD</div>
        <div className="navbar__links">
          {isAuth && (
            <input
              className="navbar__search"
              type="text"
              placeholder="search file..."
              value={searchName}
              onChange={(event) => searchNameHandler(event)}
            />
          )}
          {isAuth && <img src={avatar} alt="avatar" />}
          {!isAuth && (
            <div className="navbar__login">
              <NavLink to={"/login"}>Enter</NavLink>
            </div>
          )}
          {!isAuth && (
            <div className="navbar__registration">
              <NavLink to={"/registration"}>Registration</NavLink>
            </div>
          )}
          {isAuth && (
            <div className="navbar__login" onClick={() => dispatch(logout())}>
              Exit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
