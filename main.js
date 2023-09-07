const buttons = document.querySelectorAll(".add-to-basket");
const removeButtons = document.querySelectorAll(".remove-basket-btn");
const addButtons = document.querySelectorAll(".add-basket-btn");

function loadStorage() {
  const currentProducts = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];

  currentProducts.forEach(currentProduct => {
    const counterContainer = document.querySelector(`div[data-container-id='${currentProduct.id}']`);

    counterContainer.style.display = "flex";
    counterContainer.previousElementSibling.style.display = "none";
    counterContainer.querySelector("span").innerHTML = currentProduct.count;
  });
}

loadStorage();

removeButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    let newCount;
    const id = e.target.getAttribute("data-id");
    const currentProducts = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];
    const selectedProduct = currentProducts.find(currentProduct => currentProduct.id === id);

    if (selectedProduct.count > 1) {
      const newProducts = currentProducts.map(currentProduct => {
        if (currentProduct.id === id) {
          newCount = currentProduct.count - 1;
          return {
            ...currentProduct,
            count: newCount
          }
        }

        return currentProduct;
      });

      localStorage.setItem("basket", JSON.stringify(newProducts));
      e.target.nextElementSibling.innerHTML = newCount;
    } else {
      e.target.parentElement.style.display = "none";
      e.target.parentElement.previousElementSibling.style.display = "block";

      const newProducts = currentProducts.filter(currentProduct => {
        return currentProduct.id !== id;
      });

      localStorage.setItem("basket", JSON.stringify(newProducts));
    }
  })
})

addButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    let newCount;
    const id = e.target.getAttribute("data-id");
    const currentProducts = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];

    const newProducts = currentProducts.map(currentProduct => {
      if (currentProduct.id === id) {
        newCount = currentProduct.count + 1;
        return {
          ...currentProduct,
          count: newCount
        }
      }

      return currentProduct;
    });

    e.target.previousElementSibling.innerHTML = newCount;

    localStorage.setItem("basket", JSON.stringify(newProducts));
  })
})

buttons.forEach(button => {
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(e) {
  const id = e.target.getAttribute("data-id");
  const name = e.target.getAttribute("data-name")
  const price = e.target.getAttribute("data-price")

  e.target.style.display = "none";
  e.target.nextElementSibling.style.display = "flex";

  const product = {
    id,
    name,
    price,
    count: 1
  }

  const currentProducts = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];

  const isProductExist = currentProducts.some(currentProduct => {
    return currentProduct.id === id
  })

  if (!isProductExist) {
    currentProducts.push(product);

    const convertedProduct = JSON.stringify(currentProducts);

    localStorage.setItem("basket", convertedProduct);
  }
}