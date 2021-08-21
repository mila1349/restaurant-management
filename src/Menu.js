import React, {useState, useContext, useEffect} from 'react'
import './Order.css'
import MenuItem from "./MenuItem"
import {StateContext} from './StateContext'

function Menu() {
    const {menuProvide}=useContext(StateContext);
    const [menu, setMenu]=menuProvide;  
    const [search, setSearch]=useState("")
    const [searchItem, setSearchItem]=useState(menu)
    const [input, setInput]=useState("")

    function handleSearch(e){
        e.preventDefault()
        console.log(search)
        setSearch(input)
        setInput("")
    }

    useEffect(()=>{
        let re = new RegExp(search+'.+$', 'i');
        setSearchItem(
            menu.filter(function(e){
                return e.name.search(re) !=-1
            })
        )
    },[search])

    return (
        <div className="menu">
            <div className="menu-header">
                <h2>MENU</h2>
                <div className="menu-search">
                    <input type="search" placeholder="Search Menu" onChange={e=>setInput(e.target.value)}/>
                    <button className="btn-primary" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="menu-order-container">
                {
                   searchItem?.map(item=>(
                       <MenuItem 
                            id={item.id}
                            img={item.img}
                            title={item.name}
                            price={item.price}
                            storageImg={item.storageImg}
                            orderFlag={true}
                       />
                   ))
                }
            </div>
        </div>
    )
}

export default Menu
