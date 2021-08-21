import React, {useEffect, useContext, useState} from 'react'
import OrderPart from './OrderPart'
import './Order.css'
import {StateContext} from './StateContext'

function Kitchen() {
    const {changeProvide}=useContext(StateContext);
    const [changes, setChanges]=changeProvide; 

    const [tableSortDate, setTableSortDate]=useState([])

    //only display acttive table and order by time 
    useEffect(()=>{
        const active=changes.filter(item=>{
            return item.active===true
        })

        const temp=active.sort(function(a,b){
            return parseInt(b.date) + parseInt(a.date)
        })
        setTableSortDate(temp)
    },[changes])

    return (
        <div className="kitchen">
            <OrderPart
                tables={tableSortDate}
            />
        </div>
    )
}

export default Kitchen