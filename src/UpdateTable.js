import React, {useContext, useState} from 'react'
import {StateContext} from './StateContext'
import "./Setting.css"
import {db} from './config'

function UpdateTable() {
    const {currentProvide}=useContext(StateContext);
    const [currentTable, setCurrentTable]=currentProvide; 

    const [no, setNo]=useState(currentTable.no)
    const [cap, setCap]=useState(currentTable.cap)

    function handleUpdateTable(e){
        e.preventDefault()
        db.collection("table").doc(currentTable.id).update({
            no:no,
            capacity:cap
        })
    }

    function handleDeleteTable(e){
        e.preventDefault()
        db.collection("table").doc(currentTable.id).delete()
    }

    return (
        <div className="update-table">
            <h1>Upate Table {currentTable?.no}</h1>
            <form action="">
                <div className="account-container">
                    <h2>Table No:</h2>
                    <input type="text" required onChange={e=>setNo(e.target.value)} value={no}/>
                    <h2>Capacity: </h2>
                    <input type="number" required onChange={e=>setCap(e.target.value)} value={cap}/>
                    <h2>Active</h2>
                    <h2>{currentTable.active}</h2>
                    <button className="btn-primary" onClick={handleUpdateTable}>Update</button>
                    <button className="btn-primary" onClick={handleDeleteTable}>Delete</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateTable