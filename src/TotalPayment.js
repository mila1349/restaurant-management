import React, {useContext} from 'react'
import {StateContext} from './StateContext'
import CurrencyFormat from 'react-currency-format'
import './Payment.css'
import {db} from './config'


function TotalPayment() {
    const {orderProvide}=useContext(StateContext);
    const [order, setOrder]=orderProvide; 

    const {currentProvide}=useContext(StateContext);
    const [currentTable, setCurrentTable]=currentProvide; 

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

    function saveOrder(){
        db.collection("record").add({
            date:getDate(),
            table:currentTable.no,
            totalItem:getTotalItem(order),
            total:getTotal(order)

        }).then(function(docRef){
            const idDoc=docRef.id
            order.forEach(item=>{
                db.collection("record").doc(idDoc).collection('order').add({
                    menu:item.name,
                    qty:item.qty,
                    price:item.price,
                    total:item.total,
                    guest:currentTable.cap
                })
            })

            db.collection('table').doc(currentTable.id).update({
                active:false,
                status:"inactive",
                date:""
            })


            order.forEach(item=>{
                db.collection('table').doc(currentTable.id).collection("order-items").doc(item.id).delete()
            })
            console.log("complete")
        })
    }

    return (
        <div className="total-payment">
                <h1>Payment</h1>
            <table>
                
                <tr>
                    <td>Date:</td>
                    <td>{getDate()}</td>
                </tr>
                <tr>
                    <td>Table:</td>
                    <td>{currentTable?.no}</td>
                </tr>
                <tr>
                    <td>Total Item:</td>
                    <td>{getTotalItem(order)}</td>
                </tr>
                <tr>
                    <td>Total Guest:</td>
                    <td>{currentTable?.cap}</td>
                </tr>  
            </table>
            
            <div className="total-price">
                <div className="price-separate">
                    <h1>Total:</h1>
                    <CurrencyFormat
                        renderText={(value)=>(                                   
                            <h1><b>{value}</b></h1>                                                                       
                        )}
                        decimalScale={2}
                        value={getTotal(order)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp."}
                    />
                </div>
                <button className="save-btn" onClick={saveOrder}>Save</button>
            </div>
        </div>
    )
}

export default TotalPayment
