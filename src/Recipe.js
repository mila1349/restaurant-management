import React, {useContext, useState} from 'react'
import  './Catalogue.css'
import {db} from './config'
import {StateContext} from './StateContext'
import {useHistory} from 'react-router-dom' 


function Recipe({key, title, dishType, mealType, img, totalTime, calories, ingredients}) {
    const {menuProvide}=useContext(StateContext);
    const [menu, setMenu]=menuProvide;
    const [completed, setCompleted]=useState(false)

    const addToMenu=e=>{
        e.preventDefault();
        db.collection('menu')
            .add({
                name:title,
                price:0,
                img:img,
                storageImg:""
            }).then(function(docRef){
                //get id doc and put data to context api
                const data={
                    id:docRef.id,
                    name:title,
                    price:0,
                    img:img,
                    storageImg:""
                }
                setMenu(prevMenu=>{
                    return [...prevMenu, data]
                })
                setCompleted(true)
            })
    }

    return (
        <div className="recipe">
            <div className="recipe-title">
                <h3>{dishType}</h3>
                <section>
                    <h2>{title}</h2>
                </section>
            </div>
            <div className="recipe-desc">
                <div className="desc">
                    <h1>Calories</h1>
                    <p>{calories}</p>
                </div>
                <div className="desc">
                    <h1>Meal Type</h1>
                    <p>{mealType}</p>
                </div>
                <div className="desc">
                    <h1>Time</h1>
                    <p>{totalTime} min</p>
                </div>
            </div>
            <div className="desc-container">             
                <img src={img} alt="" />             
                <div className="recipe-ingredient">
                    <ol>
                        {
                            ingredients.map(item=>(
                                <li>{item}</li>
                            ))
                        }
                    </ol>
                </div>
            </div>
            <button  onClick={addToMenu} className="btn-primary">{completed?"Completed":"Add to menu"}</button>
        </div>
    )
}

export default Recipe
