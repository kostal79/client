import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    files: [],
    currentDir: null,
    popupDisplay: "none",
    dirStack: [],
    view: "list"
}

export const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        setFiles: (state, action) => { state.files = action.payload },
        setCurrentDir: (state, action) => { state.currentDir = action.payload },
        addFile: (state, action) => { state.files = [...state.files, action.payload] },
        setPopup: (state, action) => { state.popupDisplay = action.payload },
        pushToStack: (state, action) => { state.dirStack.push(action.payload) },
        deleteFromStack: (state) => { state.dirStack.pop() },
        delFile: (state, action) => { state.files = state.files.filter(file => file._id !== action.payload) },
        setView: (state, action) => {state.view = action.payload}
    }
})

export const { setFiles, setCurrentDir, addFile, setPopup, pushToStack, deleteFromStack, delFile, setView } = fileSlice.actions
export default fileSlice.reducer