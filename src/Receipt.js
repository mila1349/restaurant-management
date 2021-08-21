import React, {useContext} from 'react'
import {StateContext} from './StateContext'
import CurrencyFormat from 'react-currency-format'

import './Payment.css'

function Receipt() {
    const {orderProvide}=useContext(StateContext);
    const [order, setOrder]=orderProvide; 

    return (
        <div className="receipt">
            <h1>Receipt</h1>
            <table>
                <tr className="table-title">
                    <td>Food/Drink</td>
                    <td>Qty</td>
                    <td>Price/item</td>
                    <td>Subtotal</td>
                </tr>
                {
                    order.map(item=>(
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <CurrencyFormat
                                renderText={(value)=>(                                   
                                    <td>{value}</td>                                                                     
                                )}
                                decimalScale={2}
                                value={item.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp."}
                            />
                            <CurrencyFormat
                                renderText={(value)=>(                                   
                                    <td>{value}</td>                                                                     
                                )}
                                decimalScale={2}
                                value={item.total}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp."}
                            />
                        </tr>
                    ))
                }
                
            </table>
            
        </div>
    )
}

export default Receipt
