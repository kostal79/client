import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFile } from "../../actions/file";
import { setPopup } from "../../redux/slices/fileSlice";
import Input from "../Input/Input";

const Popup = () => {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useSelector((state) => state.file.popupDisplay);
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);

  function createHandler() {
    createFile(currentDir, dirName, dispatch);
    setDirName("")
    dispatch(setPopup("none"))
  }

  return (
    <div
      className="popup"
      onClick={() => dispatch(setPopup("none"))}
      style={{ display: popupDisplay }}
    >
      <div
        className="popup__content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="popup__header">
          <div className="popup__title">Create new folder</div>
          <button
            className="popup__close"
            onClick={() => dispatch(setPopup("none"))}
          >
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Enter folder's name..."
          value={dirName}
          setValue={setDirName}
        />
        <button className="popup__create" onClick={() => createHandler()}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Popup;
