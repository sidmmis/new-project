// NutritionCard.js
import React from "react";
import "../../styles/Nutrition.css";

const NutritionCard = (item) => {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <ul>
        <li>Calories: {item.calories}</li>
        <li>Serving Size: {item.serving_size_g}g</li>
        <li>Total Fat: {item.fat_total_g}g</li>
        <li>Saturated Fat: {item.fat_saturated_g}g</li>
        <li>Protein: {item.protein_g}g</li>
        <li>Sodium: {item.sodium_mg}mg</li>
        <li>Potassium: {item.potassium_mg}mg</li>
        <li>Cholesterol: {item.cholesterol_mg}mg</li>
        <li>Total Carbohydrates: {item.carbohydrates_total_g}g</li>
        <li>Fiber: {item.fiber_g}g</li>
        <li>Sugar: {item.sugar_g}g</li>
      </ul>
    </div>
  );
};

export default NutritionCard;
