import React, {useContext} from 'react'
import {StateContext} from './StateContext'
import "./Setting.css"
import AddTable from './AddTable'
import UpdateTable from './UpdateTable'
import Table from './Table'

function Tables() {
    const {changeProvide}=useContext(StateContext);
    const [changes, setChanges]=changeProvide; 

    return (
        <div className="tables">
            <h1>Tables Management</h1>
            <Table
                tables={changes}
            />
            <div className="table-manage-container">
                <UpdateTable/>
                <div className="line"></div>
                <AddTable/>
            </div>
        </div>
    )
}

export default Tables