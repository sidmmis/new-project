import React, { useState } from "react";
import axios from "axios";
// import "../../styles/Nutrition.css";
import NutritionCard from "./NutritionItem.js";
import nutrition from "./nutrition.jpg";

const Nutrition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [nutritionData, setNutritionData] = useState(null);

  const fetchData = async () => {
    const apiKey = "YBfXKFNgp2fhGfPVd4UFfA==SzR9SeAJeiHL4269";

    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${searchTerm}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": apiKey,
          },
        }
      );

      const firstItem = response.data.items[0];
      setNutritionData(firstItem);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${nutrition})`, // Insert your background image here
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px #fff",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ marginBottom: "20px", color: "#fff" }}>
            Search Nutrition in Your Food
          </h1>
        </div>
        <div>
          <input
            type="search"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Type the food item..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            onKeyPress={(e) => {
              if (e.key === "Enter") fetchData();
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {nutritionData ? (
            <div
              style={{
                maxWidth: "400px",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                background: "#fff",
              }}
            >
              <p style={{ fontWeight: "bold" }}>
                Showing nutrition for: {nutritionData.name}
              </p>
              <NutritionCard
                {...nutritionData}
                style={{
                  background: "#rgb(47, 72, 237)", // Apply background color
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  marginBottom: "10px",
                  // Merge with any additional styles passed from parent
                }}
              />
            </div>
          ) : (
            <p style={{ fontStyle: "italic", color: "#999" }}>Not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
