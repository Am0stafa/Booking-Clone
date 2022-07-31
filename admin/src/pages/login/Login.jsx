import React, { useContext, useState } from 'react'
import { AuthContext } from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import "./login.css";

const Login = () => {
    const [credentials,setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    
    const {loading,error,dispatch} = useContext(AuthContext)

    const navigation = useNavigate()
    const handleChange = (e) => {
        setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
    }
    const handleClick = async(e) => {
        e.preventDefault()
        dispatch({type: 'LOGIN_START'})
        try {
            const res = await axios.post("/auth/login",credentials)
            if(res.data.isAdmin){
              dispatch({type: 'LOGIN_SUCCESS',payload:res.data.details})
              navigation('/')
            }else{
              dispatch({
                type: "LOGIN_FAILURE",
                payload: { message: "You are not allowed!" },
              });
            }
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });

        }
    }


    return (
        <div className="login">
          <div className="lContainer">
          <h1>Admin Only</h1>
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
              className="lInput"
              autoComplete='email'
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
              autoComplete='password'
            />
            <button disabled={loading} onClick={handleClick} className="lButton">
              Login
            </button>
            {error && <span>{error.message}</span>}
          </div>
        </div>
      );
}

export default Login