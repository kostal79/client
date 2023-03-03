import React, { useState } from "react";
import "./Navbar.less";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { getFiles, searchFile } from "../../actions/file";
import { showLoader } from "../../redux/slices/appSlice";
import defaultAvatar from "../../assets/images/defaultavatar.svg";
import { API_URL } from "../../config";
import Icon from "../../assets/Icon";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const currentDir = useSelector((state) => state.file.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const avatar = currentUser.avatar
    ? `${API_URL}/${currentUser.avatar}`
    : defaultAvatar;

  const searchNameHandler = (event) => {
    setSearchName(event.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }

    dispatch(showLoader());
    if (event.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          ([value, dispatch]) => {
            searchFile(value, dispatch);
          },
          500,
          [event.target.value, dispatch]
        )
      );
    } else {
      getFiles(currentDir, dispatch, "type");
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <NavLink to={"/"}>
          <div className="navbar__logo">
            <Icon />
          </div>
        </NavLink>
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
          {!isAuth && (
            <div className="navbar__login">
              <NavLink to={"/login"}>Login</NavLink>
            </div>
          )}
          {!isAuth && (
            <div className="navbar__registration">
              <NavLink to={"/registration"}>Sign in</NavLink>
            </div>
          )}
          {isAuth && (
            <div className="navbar__login" onClick={() => dispatch(logout())}>
              Exit
            </div>
          )}
          {isAuth && (
            <NavLink to={"/profile"}>
              <img className="navbar__avatar" src={avatar} alt="avatar" />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
