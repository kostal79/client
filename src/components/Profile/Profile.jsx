import React from "react";
import { useDispatch } from "react-redux";
import { deletedAvatar, uploadAvatar } from "../../actions/user";
import "./Profile.less";
import uploadLogo from "../../assets/images/uploadavatar.svg"

const Profile = () => {
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    const file = event.target.files[0];
    uploadAvatar(file, dispatch);
  };
  return (
    <div className="profile">
      <div className="profile__upload">
        <label htmlFor="profile__input" className="profile__upload--label">
          <img className="profile__img" src={uploadLogo} />
          <p className="profile__text">Upload avatar</p>
        </label>
        <input
          className="profile__upload--input"
          id="profile__input"
          type="file"
          placeholder="Upload avatar"
          onChange={(event) => changeHandler(event)}
          accept="image/*"
        />
      </div>
      <button className="profile__btn" onClick={() => deletedAvatar(dispatch)}>
        Delete avatar
      </button>
    </div>
  );
};

export default Profile;
