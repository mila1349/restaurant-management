import React from 'react'
import './Order.css'
import TableItem from './TableItem'


function Table({tables}) {
    
    return (
        <div className="table">
            {
                tables.map(change=>(
                    <TableItem 
                        id={change.id}
                        no={change.no}
                        cap={change.cap}
                        active={change.active}
                        status={change.status}
                    />
                ))
            }
        </div>
    )
}

export default Table
