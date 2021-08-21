import React, {useState, createContext} from 'react'
import {db} from './config'

export const StateContext=createContext();

export const StateProvider=props=>{
    const [user, setUser]=useState("");
    const [menu, setMenu]=useState([]);
    const [update, setUpdate]=useState([]);
    const [changes, setChanges]=useState([]);
    const [currentTable, setCurrentTable]=useState([]);
    const [order, setOrder]=useState([])

    return <StateContext.Provider 
        value={{
            userProvide: [user, setUser], 
            menuProvide:[menu, setMenu], 
            updateProvide:[update, setUpdate], 
            changeProvide:[changes, setChanges],
            currentProvide:[currentTable, setCurrentTable],
            orderProvide:[order, setOrder]
        }} >{props.children}</StateContext.Provider>
}
