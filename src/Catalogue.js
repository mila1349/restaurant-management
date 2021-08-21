import React, {useState, useEffect} from 'react'
import './Catalogue.css'
import Recipe from './Recipe'

function Catalogue() {
    const APP_ID='0abf7152';
    const APP_KEY='fe5df1e0c1d5f3cacba86360216fafb6';

    const [query, setQuery]=useState('chicken');
    const [recipes, setRecipes]=useState([]);
    const [search,setSearch]=useState("");

    useEffect(()=>{
        getRecipes();
    },[query])

    const getRecipes=async()=>{
        const response =await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data=await response.json();
        setRecipes(data.hits);
        console.log(recipes);
    }

    function getSearch(e){
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    return (
        <div className="catalogue">
            <h1>CATALOGUE</h1>
            <input onChange={e=>setSearch(e.target.value)} type="search" placeholder="Search recipe"/>
            <button className="btn-primary" onClick={getSearch}>search</button>
            <div className="recipe-container">
                {
                    recipes.map(recipe=>(
                        <Recipe
                            key={recipe.recipe.label}
                            title={recipe.recipe.label}
                            dishType={recipe.recipe.dishType}
                            calories={recipe.recipe.calories}
                            mealType={recipe.recipe.mealType}
                            totalTime={recipe.recipe.totalTime}
                            img={recipe.recipe.image}
                            ingredients={recipe.recipe.ingredientLines}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Catalogue
