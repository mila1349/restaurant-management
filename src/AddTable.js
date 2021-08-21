import React, {useState} from 'react'
import './Setting.css'
import {db} from './config'

function AddTable() {
    const [no, setNo]= useState("")
    const [capacity, setCapacity]= useState("")

    function handleAddTable(e){
        e.preventDefault()
        db.collection('table')
            .add({
                no:no,
                capacity:capacity,
                active:false,
                status:"inactive"
            })
        console.log(no, capacity)
    }

    return (
        <div className="add-table">
            <h1>Add Table</h1>
            <form action="">
                <div className="account-container">
                    <h2>Table No:</h2>
                    <input type="text" required onChange={e=>setNo(e.target.value)}/>
                    <h2>Capacity: </h2>
                    <input type="number" required onChange={e=>setCapacity(e.target.value)}/>
                    <button className="btn-primary" onClick={handleAddTable}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddTable
