import React from "react";
import { useSelector } from "react-redux";
import "./FileList.less";
import File from "./File/File";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const FileList = () => {
  const sortMethod = useSelector((state) => state.file.sortMethod);
  let files = useSelector((state) => state.file.files);
  const view = useSelector((state) => state.file.view);

  if (!files.length) {
    return <div className="loader">No files</div>;
  }

  if (view === "list") {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Name</div>
          <div className="filelist__date">Date</div>
          <div className="filelist__size">Size</div>
        </div>
        <TransitionGroup>
          {sortMethod === "dec"
            ? files.map((file) => (
                <CSSTransition
                  key={file._id}
                  timeout={500}
                  classNames={"file"}
                  exit={false}
                >
                  <File file={file} />
                </CSSTransition>
              ))
            : files
                .map((file) => (
                  <CSSTransition
                    key={file._id}
                    timeout={500}
                    classNames={"file"}
                    exit={false}
                  >
                    <File file={file} />
                  </CSSTransition>
                ))
                .reverse()}
        </TransitionGroup>
      </div>
    );
  } else if (view === "plate") {
    return (
      <div className="fileplate">
        {sortMethod === "dec"
          ? files.map((file) => <File file={file} key={file._id} />)
          : files.map((file) => <File file={file} key={file._id} />).reverse()}
      </div>
    );
  }
};

export default FileList;
