import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from 'react-toastify';
import { url } from "./api";
import jwtDecode from 'jwt-decode'

const initialState = {
    token: localStorage.getItem('token'),
    name: "",
    email: "",
    _id: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false
};



export const registerUser = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {

        console.log(user)

        const res = await axios.post(`${url}/register`, user);


         localStorage.setItem('token',res.data.token)

        return  res.data.token;
    } catch (error) {
        console.log(error.response.data)
        return rejectWithValue(error.response.data)


    }

}
);


export const  loginUser = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {

        console.log(user)

        const res = await axios.post(`${url}/login`, user);


        localStorage.setItem('token',res.data.token)

        return  res.data.token;
    } catch (error) {
        console.log(error.response.data)
        return rejectWithValue(error.response.data)


    }

}
);


const authSlice = createSlice({

    name: "auth",
    initialState:initialState,
    reducers:{

        _loadUser(state,action) {
            const token= state.token

            if(token) {
                const user = jwtDecode(token)

                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    userLoaded:true,
                }
            }

        },
        _logoutUser (state,action) {
            localStorage.removeItem("token")

            return {
                ...state,
                token: "",
                name: "",
                email: "",
                _id: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userLoaded: false


            }

        }

    },
    extraReducers: {
        [registerUser.pending]: (state, action) => {
            return { ...state, registerStatus: "pending" }

        },
        [registerUser.fulfilled]: (state, action) => {
            const user = jwtDecode(action.payload)
            if (action.payload) {
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    registerStatus: "success"
                };
            } else return state
        },

        [registerUser.rejected]: (state, action) => {
            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload
            }

        },



        [loginUser.pending]: (state, action) => {
            return { ...state, loginStatus: "pending" }

        },
        [loginUser.fulfilled]: (state, action) => {
            const user = jwtDecode(action.payload)
            if (action.payload) {
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    loginStatus: "success"
                };
            } else return state
        },

        [loginUser.rejected]: (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload
            }

        },
    }
  
    
})


export const {_loadUser,_logoutUser} = authSlice.actions;
export default authSlice.reducer