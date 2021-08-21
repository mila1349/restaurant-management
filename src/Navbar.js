import React, {useContext, useEffect} from 'react'
import {Link, useHistory} from "react-router-dom"
import './Navbar.css'
import IconButton from '@material-ui/core/IconButton';
import {StateContext} from './StateContext'
import {auth} from './config'


function Navbar() {
  const {userProvide}=useContext(StateContext);
  const [user, setUser]=userProvide;

  const history = useHistory();

    //if there is no user then redirect to account
    useEffect(()=>{
        if(user===""){
            history.push('/account')
        }
    },[])

    //function to log out
   function logOut(){
        auth.signOut().then(()=>{
            setUser("")
        })
   }
    return (
        <div className="navbar">
            <Link to="/account">
                <div className="user" onClick={logOut}>
                    <h1>Hi, {user}</h1>
                </div>
            </Link>
            
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>

                <Link to="/order">
                    <li>Order</li>
                </Link>

                <Link to="/kitchen">
                    <li>Kitchen</li>
                </Link>

                <Link to="/payment">
                    <li >Payment</li>
                </Link>
                
                <Link to="/setting">
                    <li>Menu</li>
                </Link>

                <Link to="/setting-tables">
                    <li>Tables</li>
                </Link>
            </ul>
        </div>
    )
}

export default Navbar
