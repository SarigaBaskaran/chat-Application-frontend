import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

let socket;
function Chat() { 
    
    const backEndUrl = 'https://chat-application-backend-o0hp.onrender.com';

    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        // Retrieve user and room  from session storage or other sources
        const name = JSON.parse(sessionStorage.getItem('name'));
        const room = JSON.parse(sessionStorage.getItem('room'));

        setUser(name)
        setRoom(room)

        socket = io(backEndUrl);

        socket.emit('join', {name:name,room:room},(error)=>{
            if(error){
                alert(error)
            }
        })
        return ()=>{
            socket.disconnect();
            socket.off();
        }

    },[])

    useEffect(() => {
        socket.on('message', msg => {
            setMessages(prevMessages => [...prevMessages, msg])
        })
    },[])

    const sendMessage = (e) => {
        //  e.preventDefault()
        // socket.emit('sendMsg', msg, () => {
        //     setMsg("")
        // })
        socket.emit('sendMsg', msg,() => setMsg(""))
    }

    const leaveChat = (e) => {
        navigate('/')
    }

    return (
       
        <div className="min-h-screen py-20" style={{backgroundImage: 'linear-gradient(115deg, #9F7AEA, #FEE2FE)'}}>
            <div className="container mx-auto">
                <div className="flex flex-col  w-10/12  bg-white rounded-xl mx-auto shadow-lg overflow-hidden p-3">
                    <div className="w-full py-4 px-6 flex justify-between items-center">
                        <div>
                            <div>
                                <p className="text-black text-sm lg:text-2xl font-medium mb-3">Hi, {user}! You are in the {room} Chat Room.</p>
                            </div>
                        </div>
                        <div className="flex space-x-4"> 
                            <button className="text-white  text-sm lg:text-l bg-red-500 py-2 px-2 rounded-lg" 
                            onClick={(e) => {
                                e.preventDefault();
                                leaveChat(e)
                            }}
                            >
                                Leave Chat</button>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-b-lg">
                        <div className="p-4 flex flex-col">
                            <div className="flex flex-col space-y-2">
                               
                                        {
                                            messages.map((e, i) => (
                                                e.user === user?.toLocaleLowerCase() ? <>
                                               
                                                 <div className=" flex items-end justify-end base_receive">
                                                        <div className="bg-gray-300 rounded-lg p-2">
                                                            <p>{e.text}</p>
                                                            <time className='text-xs text-gray-600 text-left'>{e.user}</time>
                                                        </div>
                                                 </div>
                                                </> : <>
                                                <div  key={i} className="flex items-start base_sent">
                                                    <div className="bg-purple-700 bg-opacity-80 rounded-lg p-3">
                                                         <p className="text-white">{e.text}</p>
                                                         <time className='text-xs text-gray-600 text-left'>{e.user}</time>
                                                    </div>
                                                 </div>
                                               
                                                </>
                                            ))
                                        }
                                      
                                    </div>
                                </div>
                               
                            </div>
                            <div className="flex items-center border-t pt-4">
                            <input type='text'
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" ? sendMessage(e) : null}
                                className="flex-grow border rounded-lg p-1 mr-1" placeholder="Type your message here..."
                            />                               
                                <button className="px-2 py-2 text-sm lg:text-l bg-blue-500 text-white rounded-lg" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    sendMessage(e)
                                }}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Chat;
