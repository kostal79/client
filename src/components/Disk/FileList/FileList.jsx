import React from "react";
import { useSelector } from "react-redux";
import "./FileList.less";
import File from "./File/File";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const FileList = () => {
  const files = useSelector((state) => state.file.files);
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
          {files.map((file) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames={"file"}
              exit={false}
            >
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  } else if (view === "plate") {
    return (
      <div className="fileplate">
        {files.map((file) => (
          <File file={file} key={file._id}/>
        ))}
      </div>
    );
  }
};

export default FileList;
