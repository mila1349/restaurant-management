import React, {useContext} from 'react'
import CheckIcon from '@material-ui/icons/Check';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import './Order.css'
import {db} from './config'
import {StateContext} from './StateContext'

function OrderItem({id, name, qty, price, ready}){
    const {currentProvide}=useContext(StateContext);
    const [currentTable, setCurrentTable]=currentProvide; 

    const {orderProvide}=useContext(StateContext);
    const [order, setOrder]=orderProvide; 
    
    function deleteOrder(){
        if(order.length>1){
            db.collection("table").doc(currentTable.id).collection("order-items").doc(id).delete()
        }else{
            db.collection("table").doc(currentTable.id).collection("order-items").doc(id).delete()
            db.collection("table").doc(currentTable.id).update({
                active:false,
                status:"inactive",
                date:""
            })
        }
    }

    function  handleReady(){
        //chef can decide wheter the food ready or not
            db.collection("table").doc(currentTable.id).collection("order-items").doc(id).update({
                ready:!ready
            })
        
    }

    function increaseQty(){
        db.collection("table").doc(currentTable.id).collection("order-items").doc(id).update({
            qty:qty+1,
            total:(qty+1)*price
        })
        console.log("increase")
    }

    function decreaseQty(){
        if(qty>1){
            db.collection("table").doc(currentTable.id).collection("order-items").doc(id).update({
                qty:qty-1,
                total:(qty-1)*price
            })
        }else{
            deleteOrder();
        }
        console.log("decrease")
    }

    return (
        <div className="order-item">
            <div className="order-name">
                <h3>{name}</h3>
            </div>
            <div className="order-price">
               <h3>{qty}</h3> 
            </div>
            <div className="arrow-wrapper">
                <ExpandLessIcon style={{color:"#324c4f", fontSize:"22px", cursor:"pointer"}} onClick={increaseQty}/>
                <ExpandMoreIcon style={{color:"#50333b", fontSize:"22px", cursor:"pointer"}} onClick={decreaseQty}/>
            </div>
            {ready?<CheckIcon style={{color:"#324c4f", fontSize:"40px", cursor:"pointer"}} onClick={handleReady}/>:<QueryBuilderIcon style={{color:"#50333b", fontSize:"40px", cursor:"pointer"}} onClick={handleReady}/>}
            {<DeleteIcon style={{color:"#50333b", fontSize:"40px", cursor:"pointer"}} onClick={deleteOrder}/>}
        </div>
    )
}

export default OrderItem