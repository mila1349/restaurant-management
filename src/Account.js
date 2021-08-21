import React, {useState, useContext} from 'react'
import './Account.css'
import {auth, db} from './config'
import {useHistory} from 'react-router-dom' 
import {StateContext} from './StateContext'
import {Link} from "react-router-dom"


function Account() {
    const [email, setEmail]=useState("");
    const [pass, setPass]=useState("");
    const history = useHistory();
    const {userProvide}=useContext(StateContext);
    const [user, setUser]=userProvide;


    function handleLogin(){
        auth.signInWithEmailAndPassword(email, pass).then(auth=>{
            db.collection('user').where('email','==',email).limit(1).get().then((querySnapshot)=>{
                setUser(querySnapshot.docs[0].data().name)
                history.push('/')
            })
        }).catch(error => alert(error.message))
    }

    return (
        <div className="account">
            <div className="account-container">
                <h2>Email:</h2>
                <input onChange={e=>setEmail(e.target.value)}type="email" placeholder="Enter your email" />
                <h2>Password:</h2>
                <input onChange={e=>setPass(e.target.value)} type="password" />
                <div className="button-container">
                    <button onClick={handleLogin} className="btn-primary">Log in</button>
                    <p>Don't have account sign up here!</p>
                    <Link to="/signup">
                        <button className="btn-primary">Sign up</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Account
