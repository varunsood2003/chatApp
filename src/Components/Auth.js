import React from 'react'
import "./Auth.css"
import {auth,provider} from '../firebase-config.js'
import {signInWithPopup} from 'firebase/auth'
import Cookies from 'universal-cookie';
export default function Auth(props) {
    const cookies =new Cookies();
    const signingoogle = async ()=>{
        try {
            const result = await signInWithPopup(auth,provider);
            cookies.set("auth-token", result.user.refreshToken);
            props.setIsAuth(true);
        } catch (error) {
            console.log(error)
        }
    };
    return (
    <div className='auth'>
        <p>Welcome to Chat-App</p>
        <p>Sign in with Google</p>
        <button onClick={signingoogle}>Sign in</button>
    </div>
  )
}
