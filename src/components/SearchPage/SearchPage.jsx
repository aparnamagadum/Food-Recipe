import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { Link } from "react-router-dom";

function SearchPage() {
  const [results, setResults] = useState([]);
  const [favRecipe, setFavRecipe] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noItem, setItem] = useState(false);


  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavRecipe(storedFavorites);
  }, []);

  async function fetchedData() {
    if (searchTerm) {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=da84d3cb&app_key=07766072aed6038895f0acbed0418547`
      );
      const data = await response.json();
      setResults(data.hits);
    }
  }

  const handleClick = () => {
    if (!searchTerm) {
      return;
    } else {
      setItem(true);
    }
    fetchedData();
  };

 
  const toggleFavorite = (recipe) => {
    const isFavorite = favRecipe.some((fav) => fav.uri === recipe.uri);
    let updatedFavorites;

    if (isFavorite) {
     
      updatedFavorites = favRecipe.filter((fav) => fav.uri !== recipe.uri);
    } else {
    
      updatedFavorites = [...favRecipe, recipe];
    }

    setFavRecipe(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  
  const removeFromFavorites = (recipe) => {
    const updatedFavorites = favRecipe.filter((fav) => fav.uri !== recipe.uri);
    setFavRecipe(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };


  const isFavorite = (recipe) => {
    return favRecipe.some((fav) => fav.uri === recipe.uri);
  };

  return (
    <>
      <div className="search-container">
        <h1>Search Recipes</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleClick}>Search</button>
      </div>

      {favRecipe.length > 0 && <h2>Favorite Recipes</h2>}
      <div className="fav-recipe-container">
        {favRecipe.map((recipe, index) => (
          <div key={index} className="fav-recipe-card">
            <h3>{recipe.label}</h3>
            <img src={recipe.image} alt={recipe.label} />
            <button
              onClick={() => removeFromFavorites(recipe)}
              className="remove-fav-btn"
            >
              Remove from Favourites
            </button>
          </div>
        ))}
      </div>

      {results.length > 0 && <h1>Search Result for {searchTerm}</h1>}
      <div className="recipe-container">
        {results.length > 0
          ? results.map((result, index) => (
              <div key={index} className="recipe-card">
                <Link to={`/item/${result.recipe.uri.split("_")[1]}`}>
                  <h1>{result.recipe.label}</h1>
                  <img src={result.recipe.image} alt={result.recipe.label} />
                </Link>
                <p>{Math.round(result.recipe.calories)} calories</p>
                <button
                  onClick={() => toggleFavorite(result.recipe)}
                >
                  {isFavorite(result.recipe)
                    ? "Remove from Favourites"
                    : "Add to Favourites"}
                </button>
              </div>
            ))
          : ""}
        {noItem && results.length === 0 && <h1>No Items Found</h1>}
      </div>
    </>
  );
}

export default SearchPage;
