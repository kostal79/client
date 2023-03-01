import React from "react";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../redux/slices/uploadSlice";
import "./Uploader.less"

const UploadFile = ({file}) => {
    const dispatch = useDispatch();
    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name.lenth < 25 ? file.name : file.name.slice(0, 25) + "..."}</div>
                <button className="upload-file__remove" onClick={() => dispatch(removeUploadFile(file.id))}>X</button>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{width: `${file.progress}%`}}></div>
                <div className="upload-file__percent">{file.progress}%</div>
            </div>
        </div>
    )
}

export default UploadFile