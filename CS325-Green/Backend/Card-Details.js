var regexCardName = /^[a-zA-Z\s]*$/; //Only permits letters and spaces.
var regexCardNum = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/; // From https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-2.php
var regexExpDate = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // From https://regex101.com/library/AFarfB
var regexCVV = /^[0-9]{3,4}$/;

document.getElementById("checkout").addEventListener("click", () => {
    var isValid = true;
    if(!regexCardName.test(document.getElementById("cardName").value)) {
        isValid = false;
        alert("Invalid Name.");
    }
    if(!regexCardNum.test(document.getElementById("cardNum").value)) {
        isValid = false;
        alert("Invalid Card Number.");
    }
    if(!regexExpDate.test(document.getElementById("expDate").value)) {
        isValid = false;
        alert("Invalid Expiration Date.");
    }
    if(!regexCVV.test(document.getElementById("cvv").value)) {
        isValid = false;
        alert("Invalid CVV number.");
    }
    if(isValid === true) {
        window.location.href = "payment_succ.html";
    }  
});

document.getElementById("cart").addEventListener("click", () => {
    window.location.href = "Cart.html";
});

window.onload = (event) => {
    console.log("The cart is:\n" + window.sessionStorage.getItem("cart"));
};