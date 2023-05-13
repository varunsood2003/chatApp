import "./App.css";
import Auth from "./Components/Auth";
import Chat from "./Components/Chat";
import Cookies from "universal-cookie";
import { useState,useRef } from "react";
import {signOut} from 'firebase/auth'
import {auth} from './firebase-config'
function App() {
  const cookie = new Cookies();
  const [room, setRoom] = useState(null);
  const roomRef=useRef(null);
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const handleSignout=async ()=>{
    await signOut(auth);
    cookie.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return (
    <>
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className="room">
          <label>Enter room name :</label>
          <input ref={roomRef}/>
          <button onClick={()=>{setRoom(roomRef.current.value)}}>Enter Chat</button>
        </div>
      )}

      <div >
        <button onClick={handleSignout} className="sign-out">Sign Out</button>
      </div>
    </>
  );
}

export default App;
