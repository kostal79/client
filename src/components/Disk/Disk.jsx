import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import {
  deleteFromStack,
  setCurrentDir,
  setPopup,
  setSortMethod,
  setView,
} from "../../redux/slices/fileSlice";
import "./Disk.less";
import FileList from "./FileList/FileList";
import Popup from "./Popup";
import Uploader from "./Uploader/Uploader";
import backArrow from "../../assets/images/backarrow.svg";
import sortIcon from "../../assets/images/sorticon.svg";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);
  const dirStack = Array.from(useSelector((state) => state.file.dirStack));
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");
  const loader = useSelector((state) => state.app.loader);
  const sortMethod = useSelector((state) => state.file.sortMethod);

  function showPopup() {
    dispatch(setPopup("flex"));
  }

  useEffect(() => {
    getFiles(currentDir, dispatch, sort);
  }, [currentDir, sort]);

  const backClickHandler = () => {
    const backDirId = dirStack.at(-1);
    dispatch(setCurrentDir(backDirId));
    dispatch(deleteFromStack());
  };

  const fileUploadHandler = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => uploadFile(file, currentDir, dispatch));
  };

  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => uploadFile(file, currentDir, dispatch));
    setDragEnter(false);
  }

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        <button
          className="disk__back"
          onClick={() => backClickHandler()}
          disabled={currentDir ? false : true}
        >
          <img src={backArrow} alt="back" />
        </button>
        <button className="disk__create" onClick={() => showPopup()}>
          Create dir
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Upload file
          </label>
          <input
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
            onChange={(event) => fileUploadHandler(event)}
            multiple={true}
          />
        </div>
        <img
          className={`disk__sort-icon disk__sort-icon--${sortMethod}`}
          src={sortIcon}
          alt="sort method"
          onClick={() => dispatch(setSortMethod())}
        />
        <select
          name="sort"
          id="sort"
          className="disk__select"
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
          }}
        >
          <option value="name">by name</option>
          <option value="type">by type</option>
          <option value="date">by date</option>
        </select>
        <button
          className="disk__plate"
          onClick={() => dispatch(setView("plate"))}
        ></button>
        <button
          className="disk__list"
          onClick={() => dispatch(setView("list"))}
        ></button>
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      onDrop={dropHandler}
    >
      Drop files here
    </div>
  );
};

export default Disk;
