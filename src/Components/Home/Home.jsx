import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState('');
  const [roomName, setRoomName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [roomNameError, setRoomNameError] = useState('');
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const validateUser = () => {
    if (!user.trim()) {
      setUserNameError('Enter Your Name');
      return false;
    } else {
      setUserNameError('');
      return true;
    }
  };

  const validateChatId = () => {
    if (!roomName.trim()) {
      setRoomNameError('Enter Chat ID');
      return false;
    } else if (roomName.trim().length > 12) {
      setRoomNameError('Chat ID should not exceed 12 characters');
      return false;
    } else if (roomName.trim().length < 3) {
      setRoomNameError('Chat ID should not be less than 3 characters');
      return false;
    } else {
      setRoomNameError('');
      return true;
    }
  };

  const handleCreateGroupChat = () => {
    const isUserValid = validateUser();
    const isChatIdValid = validateChatId();

    if (isUserValid && isChatIdValid) {
      const name = user;
      const room = roomName;
      sessionStorage.setItem('name', JSON.stringify(name));
      sessionStorage.setItem('room', JSON.stringify(room));
      navigate(`/${roomName}`);
    }
  };

  return (
    <div class="min-h-screen py-40" style={{ backgroundImage: 'linear-gradient(115deg, #9F7AEA, #FEE2FE)' }}>
      <div class="container mx-auto">
        <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url(/asset/chat.jpg)" }}>
            <h1 class="text-white text-3xl font-medium mb-3">Welcome to Chat Room</h1>
            <div>
              <p class="text-white font-extrabold text-5xl">Your people,</p>
              <p class="text-white font-extrabold text-5xl">all together</p>
            </div>
          </div>
          <div class="w-full lg:w-1/2 py-16 px-12">
            <h2 class="text-3xl mb-4">Create your Chat Room!</h2>
            <div class="mt-5">
              <input type="text" value={user} onChange={handleUserChange} placeholder="Enter Your Name" class="border border-gray-400 py-1 px-2 w-full" />
              {userNameError && <p className="text-red-500 mt-1">{userNameError}</p>}
            </div>
            <div class="mt-5">
              <input type="text" value={roomName} onChange={handleRoomNameChange} placeholder="Enter Chat Id" class="border border-gray-400 py-1 px-2 w-full" />
              {roomNameError && <p className="text-red-500 mt-1">{roomNameError}</p>}
            </div>
            <div class="mt-5">
              <button onClick={handleCreateGroupChat} className="w-full bg-purple-500 py-3 text-center text-white">Create Group Chat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
