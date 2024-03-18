window.addEventListener("load", function() {
    document.getElementById("customize-order").innerHTML = "Customize Your " + window.localStorage.getItem("food");
});

document.getElementById("submit-order").addEventListener("click", () => {
    let tops = [];
    let checkboxes = document.querySelectorAll('input[name=choose-toppings]:checked');
    for (let i = 0; i < checkboxes.length; i++) {
        tops.push(checkboxes[i].value);
    }

    let adds = [];
    let checkboxes2 = document.querySelectorAll('input[name=choose-addons]:checked');
    for (let i = 0; i < checkboxes2.length; i++) {
        adds.push(checkboxes2[i].value);
    }

    let order = {
        Restaurant: "The Grill",
        Item: 'Burger',
        Meat: document.querySelector('input[name="choose-meat"]:checked').value,
        Cheese: document.querySelector('input[name="choose-cheese"]:checked').value,
        SingleOrDouble: document.querySelector('input[name="Single-or-Double"]:checked').value,
        Toppings: tops,
        Addons: adds
    }

    //Appending the order to the user's cart
    let cart = window.sessionStorage.getItem("Cart");
    if(cart === null){
        cart = "";
    }
    if(cart.length !== 0) {
        cart+="\n";
    }
    cart+= "|" + JSON.stringify(order);
    window.sessionStorage.setItem("Cart", cart);

    window.location.href = "Cart.html";
});