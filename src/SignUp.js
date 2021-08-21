import React, {useState, useContext} from 'react'
import './Account.css'
import {auth, db} from './config'
import {useHistory} from 'react-router-dom'
import {StateContext} from './StateContext' 

function SignUp() {
    const [email, setEmail]=useState("");
    const [pass, setPass]=useState("");
    const history = useHistory();
    const [position, setPosition]=useState("")
    const [name, setName]=useState("");
    const {userProvide}=useContext(StateContext);
    const [user, setUser]=userProvide;


    function handleSignUp(e){
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, pass).then(function(response){
            //set user
            const userId=response.user.uid
            console.log(userId)
            //adding adtional data into database
            db.collection('user')
                .doc(userId)
                .set({
                    name:name,
                    position:position,
                    email:email
                })
                setUser(name)
                history.push('/')
            //create account successfull
        }).catch(error => alert(error.message))
    }

    return (
        <div className="account">
            <div className="account-container">
                <h2>Name:</h2>
                <input onChange={e=>setName(e.target.value)}type="text" placeholder="Enter your name" />
                <h2>Email:</h2>
                <input onChange={e=>setEmail(e.target.value)}type="email" placeholder="Enter your email" />
                <h2>Password:</h2>
                <input onChange={e=>setPass(e.target.value)} type="password" />
                <h2>Position:</h2>
                <select onChange={e=>setPosition(e.target.value)}>
                    <option value="Waitress">Waitress</option>
                    <option value="Chef">Chef</option>
                    <option value="Cashier">Cashier</option>
                </select>
                <div className="button-container">
                    <button onClick={handleSignUp} className="btn-primary">Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp
