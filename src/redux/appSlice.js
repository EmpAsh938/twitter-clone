import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    isModalOpen: false,
    userProfile: {fullname: "", email: "", profilePic: ""},
    tweets: [],
    alertMessage: "",
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            return {
                ...state,
                isModalOpen: action.payload
            }
        },
        addTweet: (state, action) => {
            return {
                ...state,
                tweets: [...action.payload]
            }
        },
        createAccount: (state, action) => {
            const {fname, imgUrl, mail, pass} = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                userProfile: {fullname: fname, profilePic: imgUrl, email: mail}
            }
        },
        loggedIn: (state, action) => {
            return {
                ...state,
                isLoggedIn: true,
                userProfile: {...state.userProfile, fullname: action.payload}
            }
        },
        getUserProfile: (state, action) => {
            const {name, photo, mail} = action.payload;
            return {
                ...state,
                userProfile: {fullname: name, profilePic: photo, email: mail}
            }
        },
        signedOut: (state) => {
            return {
                ...state,
                isLoggedIn: false,
                userProfile: {fullname: "", profilePic: "", email: ""},
                tweets: [],
                alertMessage: ""
            }
        },
        setAlert: (state, action) => {
            return {
                ...state,
                alertMessage: action.payload
            }
        },
        resetAlert: (state) => {
            return {
                ...state,
                alertMessage: "",
            }
        },
        setLogStatus: (state, action) => {
            const {name, photo, mail} = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                userProfile: {fullname: name, profilePic: photo, email: mail}
            }
        }
    }
})

export const {
     toggleModal, 
     addTweet, 
     createAccount, 
     loggedIn, 
     getUserProfile,
     signedOut,
     setAlert, 
     resetAlert,
     setLogStatus, 
} = appSlice.actions;
export default appSlice.reducer;