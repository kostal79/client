import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    files: []
}

export const uploadSlice = createSlice(
    {
        name: "upload",
        initialState,
        reducers: {
            showUploader: (state) => { state.isVisible = true },
            hideUploader: (state) => { state.isVisible = false },
            addUploadFile: (state, action) => { state.files.push(action.payload) },
            removeUploadFile: (state, action) => { state.files = state.files.filter(file => file.id !== action.payload) },
            changeUploadFile: (state, action) => {
                state.files = state.files.map((file) => {
                    if (file.id === action.payload.id) {
                        return {...file, progress: action.payload.progress}
                    } else {
                        return {...file}
                    }
                }
                )
            }
        }
    }
)

export const { showUploader, hideUploader, addUploadFile, removeUploadFile, changeUploadFile } = uploadSlice.actions
export default uploadSlice.reducer