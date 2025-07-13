const express = require('express');
const router = express.Router();

// Generate random colors
const getRandomColors = (count = 10) => {
    // Ensure count is a positive integer
    count = Number.isInteger(count) && count > 0 ? count : 10;
    return Array.from({ length: count }, () =>
      `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()}`
    );
  };

// Predefined brand list
const allBrands = [
  "Nike", "Adidas", "Zara", "H&M", "Gucci", 
  "Prada", "Louis Vuitton", "Uniqlo", "Dior", "Balenciaga",
  // ...add more brands as needed
];

// Get random brands
const getRandomBrands = (count = 10) => {
    count = Number.isInteger(count) && count > 0 ? count : 10;
    return [...allBrands]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };

// Config endpoint
router.get('/', (req, res) => {
  res.json({
    colors: getRandomColors(20), // Returns 20 random colors
    brands: getRandomBrands(15),  // Returns 15 random brands
    maxPrice: 100000,
    minPrice: 100
  });
});

module.exports = router;