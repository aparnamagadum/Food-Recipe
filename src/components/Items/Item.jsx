import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Item.css"; 

function Item() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchedItem() {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=da84d3cb&app_key=07766072aed6038895f0acbed0418547`
    );
    const data = await response.json();
    setItem(data.recipe);
  }

  useEffect(() => {
    if (id) {
      fetchedItem();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="item-container">
      <button className="back-button" onClick={handleGoBack}>
        ← Go back
      </button>

      {item ? (
        <div className="item-details">
          <h1 className="item-title">{item.label}</h1>

          <p className="item-source">
            Source:
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.source}
            </a>
          </p>

          <div className="item-img-con">
            <img className="item-image" src={item.image} alt={item.label} />

            <div className="ingredients-section">
              <h3>Ingredients:</h3>
              <ul className="ingredients-list">
                {item.ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">
                    <img
                      src={ingredient.image}
                      alt={ingredient.text}
                      className="ingredient-image"
                    />
                    <span>{ingredient.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="instructions-section">
            <h3>Cooking Instructions:</h3>
            <a
              className="item-link"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Instructions
            </a>
          </div>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default Item;
