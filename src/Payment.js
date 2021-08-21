import React, {useContext, useEffect, useState} from 'react'
import Table from './Table'
import Receipt from './Receipt'
import TotalPayment from './TotalPayment'
import './Payment.css'
import {StateContext} from './StateContext'

function Payment() {
    const {changeProvide}=useContext(StateContext);
    const [changes, setChanges]=changeProvide; 

    const [tableActive, setTableActive]=useState([])

    //only display active table
    useEffect(()=>{
        const temp=changes.filter(item=>{
            return item.active===true
        })

        setTableActive(temp)
    },[changes])

    return (
        <div className="payment">
            <Table 
                tables={tableActive}
            />

            <div className="receipt-info">
                <Receipt />
                <TotalPayment/>
            </div>
            
        </div>
    )
}

export default Payment
