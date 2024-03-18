window.addEventListener("load", function() {
    document.getElementById("customize-order").innerHTML = "Customize Your " + window.sessionStorage.getItem("food");
});

document.getElementById("cart").addEventListener("click", () => {
    window.location.href = "Cart.html";
});

document.getElementById("submit-order").addEventListener("click", () => {
    let tops = [];
    let checkboxes = document.querySelectorAll('input[name=choose-toppings]:checked');
    for (let i = 0; i < checkboxes.length; i++) {
        tops.push(checkboxes[i].value);
    }

    let order = {
        Restaurant: "Tamales",
        Item: window.sessionStorage.getItem("food"),
        Rice: document.querySelector('input[name="choose-rice"]:checked').value,
        Beans: document.querySelector('input[name="choose-beans"]:checked').value,
        Meat: document.querySelector('input[name="choose-meat"]:checked').value,
        Toppings: tops
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