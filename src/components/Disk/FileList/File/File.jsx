import React from "react";
import "./File.less";
import dirLogo from "../../../../assets/images/foldericon.svg";
import fileLogo from "../../../../assets/images/fileicon.svg";
import platedirLogo from "../../../../assets/images/platefolder.svg";
import platefileLogo from "../../../../assets/images/platefile.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../redux/slices/fileSlice";
import { deleteFile, downloadFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);
  const view = useSelector((state) => state.file.view);

  const openDirHandler = (file) => {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  };

  const downloadClickHandler = (event) => {
    event.stopPropagation();
    downloadFile(file);
  };

  const deleteClickHandler = (event) => {
    event.stopPropagation();
    deleteFile(file, dispatch);
  };

  if (view === "list") {
    return (
      <div className="file" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === "dir" ? dirLogo : fileLogo}
          alt="file or dir logo"
          className="file__img"
        />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== "dir" && (
          <button
            className="file__btn file__download"
            onClick={(event) => downloadClickHandler(event)}
          >
            Download
          </button>
        )}
        <button
          className="file__btn file__delete"
          onClick={(event) => deleteClickHandler(event)}
        >
          Delete
        </button>
      </div>
    );
  }

  if (view === "plate") {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === "dir" ? platedirLogo : platefileLogo}
          alt="file or dir logo"
          className="file-plate__img"
        />
        <div className="file-plate__name">{file.name.length < 15 ? file.name : file.name.slice(0, 15) + "..."}</div>
        <div className="file-plate__btns">
          {file.type !== "dir" && (
            <button
              className="file-plate__btn file__download"
              onClick={(event) => downloadClickHandler(event)}
            >
              Download
            </button>
          )}
          <button
            className="file-plate__btn file__delete"
            onClick={(event) => deleteClickHandler(event)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
};

export default File;
