import React, {useContext} from 'react'
import Table from './Table'
import {StateContext} from './StateContext'
import OrderItem from './OrderItem'
import CurrencyFormat from 'react-currency-format'
import './Order.css'

function OrderPart({tables}) {
    const {currentProvide}=useContext(StateContext);
    const [currentTable, setCurrentTable]=currentProvide; 

    const {orderProvide}=useContext(StateContext);
    const [order, setOrder]=orderProvide; 

    const getTotal=(order)=>{
        return Object.values(order).reduce((amount, {total})=>amount+total,0)
    }

    return(
        <div className="order-section">
            <Table
                tables={tables}
            />
                <div className="order-items">
                    <div className="order-items-container">
                        {
                            order.map(item=>(
                                <OrderItem
                                    id={item.id}
                                    name={item.name}
                                    qty={item.qty}
                                    price={item.price}
                                    ready={item.ready}
                                />
                            ))
                        }
                    </div>
                    <div className="price-bar">
                        <div className="bar-wrapper">
                            <div className="status-wrapper">
                                <h1>Status: </h1>
                                <div className="status-bar">
                                    <h3>{currentTable.status}</h3>
                                </div>
                            </div>
                            <div className="status-wrapper">
                                <h1>Total: </h1>
                                <div className="total-bar">
                                <CurrencyFormat
                                    renderText={(value)=>(                                   
                                        <h1>{value}</h1>                                                                       
                                    )}
                                    decimalScale={2}
                                    value={getTotal(order)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rp."}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default OrderPart