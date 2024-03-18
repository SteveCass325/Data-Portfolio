document.getElementById("cart").addEventListener("click", () => {
    window.location.href = "Cart.html";
});

document.getElementById("submit-order").addEventListener("click", () => {
    let adds = [];
    let checkboxes = document.querySelectorAll('input[name=choose-add-ons]:checked');
    for (let i = 0; i < checkboxes.length; i++) {
        adds.push(checkboxes[i].value);
    }

    let order = {
        Restaurant: "Deli Delish",
        Item: document.querySelector('input[name="choose-item"]:checked').value,
        Addons: adds,
        Instructions: document.getElementById("instructions").value
    }

    //Appending the order to the user's cart
    let cart = window.sessionStorage.getItem("Cart");
    if(cart === null){
        cart = "";
    }
    if(cart.length !== 0) {
        cart+="\n";
    }
    cart+= "|" + JSON.stringify(order); // | is an end of line indicator in order to split the stored string into items
    window.sessionStorage.setItem("Cart", cart);

    //Setting the food a user selected back to empty
    window.sessionStorage.setItem("food", "");

    window.location.href = "Cart.html";
});