import React, {useState, useEffect} from 'react'
import './Home.css'
import CurrencyFormat from 'react-currency-format'
import {db} from './config'

function Home() {
    const [todayData, setTodayData]=useState([])

    //get report today data
    useEffect(()=>{
        db.collection('record').where('date','==',getDate()).onSnapshot(snapshot=>{
            const temp=[]
            snapshot.docs.map(doc=>{
                const data={
                    qty:doc.data().totalItem,
                    total:doc.data().total,
                    guest:doc.data().guest
                }
                temp.push(data)
            })
            setTodayData(temp)
        })
    },[])

    function getDate(){
        const today=new Date();
        const date=today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear();
        return date
    }

    const getTotal=(order)=>{
        return Object.values(order).reduce((amount, {total})=>amount+total,0)
    }

    const getTotalItem=(order)=>{
        return Object.values(order).reduce((amount, {qty})=>amount+qty,0)
    }

    function getTime(){
        const today=new Date()
        const time=today.getHours()+":"+today.getMinutes()
        return time
    }

    return (
        <div className="home">
            <div className="header-time">
                <h4>{getDate()}</h4>
                <h4>{getTime()}</h4>
            </div>

            <div className="box-wrapper">
                <div className="box">
                    <h4 className="yellow">{getTotalItem(todayData)}</h4>
                    <h1>Total Foods</h1>
                </div>
                <div className="box">
                    <CurrencyFormat
                        renderText={(value)=>(                                   
                            <h4 className="green">{value}</h4>                                                                    
                        )}
                        decimalScale={2}
                        value={getTotal(todayData)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp."}
                    />
                    <h1>Total Payments</h1>
                </div> 
            </div>
        </div>
    )
}

export default Home
