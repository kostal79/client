import axios from "axios";
import { hideLoader, showLoader } from "../redux/slices/appSlice";
import { addFile, delFile, setFiles } from "../redux/slices/fileSlice";
import { addUploadFile, changeUploadFile, showUploader } from "../redux/slices/uploadSlice";

export async function getFiles(dirId, dispatch, sort) {
    try {
        dispatch(showLoader())
        let url = "http://localhost:5000/api/files"

        if (dirId && sort) {
            url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`
        } else if (dirId) {
            url = `http://localhost:5000/api/files?parent=${dirId}`
        } else if (sort) {
            url = `http://localhost:5000/api/files?sort=${sort}`
        }

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        dispatch(setFiles(response.data))
    } catch (error) {
        alert(error.response.data.message)
    } finally {
        dispatch(hideLoader())
    }
}

export async function createFile(dirId, name, dispatch) {
    try {
        const response = await axios.post(`http://localhost:5000/api/files`, {
            name,
            parent: dirId,
            type: "dir"
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        dispatch(addFile(response.data))
    } catch (error) {
        alert(error.response.data.message)
    }
}

export async function uploadFile(file, dirId, dispatch) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        if (dirId) {
            formData.append("parent", dirId)
        }

        let uploadFile = { name: file.name, progress: 0, id: Date.now() + file.size }

        dispatch(showUploader());
        dispatch(addUploadFile(uploadFile))

        const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                uploadFile = {...uploadFile, progress: progress};
                dispatch(changeUploadFile(uploadFile))
            }
        });
        dispatch(addFile(response.data))
    } catch (error) {
        alert(error.response.data.message)
    }
}


export async function downloadFile(file) {
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })

    if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export async function deleteFile(file, dispatch) {
    try {
        const response = await axios.delete(`http://localhost:5000/api/files/delete?id=${file._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        dispatch(delFile(file._id));
        alert(response.data.message)
    } catch (error) {
        alert(error?.response?.data?.message)
    }
}


export async function searchFile(searchName, dispatch) {
    try {
        const response = await axios.get(`http://localhost:5000/api/files/search?search=${searchName}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        dispatch(setFiles(response.data));
    } catch (error) {
        alert(error?.response?.data?.message)
    } finally {
        dispatch(hideLoader())
    }
}