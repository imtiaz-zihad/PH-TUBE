/**
 * 1.Fetch ,Load and Show Categories
 */

// Create Load Catagories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// Display Load Catagories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    console.log(item);
    // Create button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    //add button to category container
    categoryContainer.append(button);
  });
};

loadCategories();
