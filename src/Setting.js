import React, {useContext} from 'react'
import "./Setting.css"
import MenuItem from "./MenuItem"
import {Link} from "react-router-dom"
import {StateContext} from './StateContext'

function Setting() {
    const {menuProvide}=useContext(StateContext);
    const [menu, setMenu]=menuProvide;   

    return (
        <div className="setting">
            <h1>Menu Management</h1>
            <div className="menu-container">
                <Link to="add-menu">
                    <div className="add-menu" >
                        <h3>+</h3>
                        <h3>Add new dish</h3>
                    </div>
                </Link>
                {
                   menu?.map(item=>(
                       <MenuItem 
                            id={item.id}
                            img={item.img}
                            title={item.name}
                            price={item.price}
                            storageImg={item.storageImg}
                            orderFlag={false}
                       />
                   ))
                }
            </div>
        </div>
    )
}

export default Setting
