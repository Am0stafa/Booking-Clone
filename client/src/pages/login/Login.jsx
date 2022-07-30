import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
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
            dispatch({type: 'LOGIN_SUCCESS',payload:res.data.details})
            navigation('/')
        } catch (error) {
            dispatch({type: 'LOGIN_FAILURE'})
        }
    }


    return (
        <div className="login">
          <div className="lContainer">
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
              className="lInput"
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
              autocomplete
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