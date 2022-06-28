import './App.css';
import NavBar from './components/navigation/NavBar';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/Signup/SignUp'
import Chat from './pages/chat/Chat'
import { useState } from 'react';
import { AppContext, socket } from './context/appContext';

function App() {

  const [rooms, setRooms] = useState([])
  const [members, setMembers] = useState([])
  const [currentRoom, setCurrentRoom] = useState([])
  const [message, setMessage] = useState("")
  const [memberPrivateMsg, setMemberPrivateMsg] = useState({})
  const [newMsg, setMsg] = useState({})
  return (
    <>
      <AppContext.Provider value={{
        socket,
        rooms, setRooms, members, setMembers, currentRoom, setCurrentRoom
        , message, setMessage, newMsg, setMsg, memberPrivateMsg, setMemberPrivateMsg
      }}>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login/signup' element={<SignUp />} />
          <Route path='/chat' element={<Chat />} />
          {/* {user ?
          
          : */}
          {/* <Route path='/chat' element={<Login />} /> */}
          {/* } */}
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
