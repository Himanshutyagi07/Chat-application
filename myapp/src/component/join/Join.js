import React, { useState } from 'react'
import './join.css'
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom'

const Join = () => {
    const navigate = useNavigate()
    const [data, setData] = useState("")
    const handleLogin = () => {
        if (!data) {
            alert("Please enter your name");
            return;
        }
        navigate("/chat", {
            state: {
                data: data
            }
        })
    }
    return (
        <div className='JoinPage'>
            <div className='JoinContainer'>
                <img src={logo} alt='logo' />
                <h1>TIME - PASS CHAT</h1>
                <input type='text' placeholder='Enter Your Name' id='joinInput' onChange={(e) => setData(e.target.value)} />
                <button onClick={handleLogin} className='joinbtn'>Login In</button>
            </div>
        </div>
    )
}

export default Join