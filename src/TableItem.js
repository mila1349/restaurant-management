import React, {useEffect, useContext} from 'react'
import EventSeatIcon from '@material-ui/icons/EventSeat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {StateContext} from './StateContext'
import './Order.css'

function TableItem({id, no, cap, active, status}) {
    const {currentProvide}=useContext(StateContext);
    const [currentTable, setCurrentTable]=currentProvide;  

    function getKey(){
        setCurrentTable({
            id:id,
            no:no,
            cap:cap,
            status:status,
            active:active
        })
        console.log("key clicked",currentTable)
    }

    return (
        <div className="table-item" style={currentTable.id===id?{background:"#1f1d2c"}:{background:"#2e303f"}} onClick={getKey}>
            <div className="quantity">
                <p>{cap}</p>
                <PeopleAltIcon style={active?{color:"#324c4f"}:{color:"#50333b"}}/>
            </div>
            <EventSeatIcon style={active?{fontSize:"50px", color:"#324c4f"}:{fontSize:"50px", color:"#50333b"}} />
            <p>{no}</p>
        </div>
    )
}

export default TableItem 
