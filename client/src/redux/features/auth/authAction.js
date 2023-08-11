import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";


// auth action for login
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      //store token in local storage
      if (data.success) {
        // alert(data.message);
        localStorage.setItem("token", data.token);
        toast.success(data.message)
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


//auth for register
export const userRegister = createAsyncThunk(
    "auth/register",
    async({email,
        password,
        role,
        name,
        organisationName,
        hospitalName,
        website,
        address,
        phone},{rejectWithValue})=>{
           try{
              const {data} = await API.post('/auth/register',{email,
                password,
                role,
                name,
                organisationName,
                hospitalName,
                website,
                address,
                phone})
                if(data.success){
                    toast.success(data.message)
                    window.location.replace('/login')
                }
           } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              } else {
                return rejectWithValue(error.message);
              }
           }
    }
)

