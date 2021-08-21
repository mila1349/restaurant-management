import React, {useContext} from 'react'
import Menu from './Menu'
import OrderPart from './OrderPart'
import {StateContext} from './StateContext'

function Order() {
    const {changeProvide}=useContext(StateContext);
    const [changes, setChanges]=changeProvide; 

    return (
        <div className="order">
            <Menu/>
            <div className="order-part">
                <OrderPart
                    tables={changes}
                />
            </div>
        </div>
    )
}

export default Order
