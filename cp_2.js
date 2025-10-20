const apiURL = "https://www.course-api.com/javascript-store-products";

//step 4 creating function
function fetchProductsThen() {
  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Promise-based Fetch:");
      // log product names to console
      data.slice(0, 5).forEach(item => {
        console.log(item.fields.name);
      });
    })
    .catch(error => {
      handleError(error);
    });
}
//async/await
async function fetchProductsAsync() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    displayProducts(data);
  } catch (error) {
    handleError(error);
  }
}

//step 5 displaying products
function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; 

  //only first 5 products


  products.slice(0, 5).forEach(product => {
    const { name, price, image } = product.fields;
    const imgSrc = image[0].url;

    // create card element
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${imgSrc}" alt="${name}">
      <h2>${name}</h2>
      <p>$${(price / 100).toFixed(2)}</p>
    `;

    container.appendChild(card);
  });
}

//step 6-errors
function handleError(error) {
  console.error("An error occurred:", error.message);
  const container = document.getElementById("product-container");
  container.innerHTML = `<p style="color:red; text-align:center;">Error: ${error.message}</p>`;
};

//step 7 calling  both functions
fetchProductsThen();
fetchProductsAsync();