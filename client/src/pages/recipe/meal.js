import React, { useState } from "react";

import "../../styles/Recipe.css";
import "./mealsearch.css";
import Mealitem from "./mealitem";
import meal from "../Guest/guest.jpg";
const Meal = () => {
  const [search, setSearch] = useState("");
  const [Mymeal, setMeal] = useState();
  const searchMeal = (evt) => {
    if (evt.key == "Enter") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setMeal(data.meals);
          setSearch("");
        });
    }
    console.log("Mymeal");
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${meal})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div className="main">
          <div className="heading" style={{ color: "black" }}>
            <h1>Search Your Food Recipe</h1>
          </div>
          <div className="searchBox">
            <input
              type="search"
              className="search-bar"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="search your food item here..."
              onKeyPress={searchMeal}
              style={{ border: "1px solid black" }}
            />
          </div>

          <div className="container">
            {Mymeal == null ? (
              <p className="notSearch">Not found</p>
            ) : (
              Mymeal.map((res) => {
                return <Mealitem key={res.idMeal} data={res} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Meal;
