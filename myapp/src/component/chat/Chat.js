import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import socketIO from 'socket.io-client';
import "./chat.css"
import sendLogo from "../images/send.png"
import Message from '../message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from '../images/closeIcon.png'

const ENDPOINTS = 'http://localhost:5000/';
let socket;
const Chat = () => {
    const [message, setMessage] = useState("")
    console.log("message", message)
    const [id, setId] = useState()
    const location = useLocation()
    const [msg, setMsg] = useState([])

    const send = () => {
        socket.emit("message", { message, id })
        setMessage("")
    }
    console.log("msg", msg)
    useEffect(() => {
        socket = socketIO(ENDPOINTS, { transports: ['websocket'] });

        socket.on("connect", () => {
            console.log("new connection")
            setId(socket.id)
        })

        socket.emit('joined', {
            user: location.state.data
        })

        socket.on('welcome', (data) => {
            setMsg([...msg, data])
            console.log(data?.user, data?.message)
        })

        socket.on('userJoined', (data) => {
            setMsg([...msg, data])
            console.log(data.user, data.message)
        })

        socket.on('leave', (data) => {
            setMsg([...msg, data])
            console.log(data.user, data.message)
        })

        return () => {
            socket.off();
        }

    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMsg([...msg, data])
            console.log("data", data)
            console.log(data.user, data.message, data.id)
        })
        return () => {
            socket.off();
            setMessage("")
        }
    }, [msg])



    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <h2>Demo Chat</h2>
                    <a href='/'><img src={closeIcon} alt='close' /></a>
                </div>
                <ReactScrollToBottom className='chatBox'>
                    {
                        msg.map((item, i) => <Message user={item.id === id ? "" : item.user} message={item.message} classs={item.id === id ? "right" : "left"} />)
                    }

                </ReactScrollToBottom>
                <div className='inputBox'>
                    <input value={message} onKeyPress={(event) => event.key === "Enter" ? send() : null} type='text' id='chatInput' onChange={(e) => setMessage(e.target.value)} />
                    <button className='sendBtn' onClick={send}>
                        <img src={sendLogo} alt='send' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat