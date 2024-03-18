document.getElementById("bowl-button").addEventListener("click", () => {
    window.sessionStorage.setItem("food", "Bowl");
    window.location.href = "TamalesOrder.html";
});

document.getElementById("burrito-button").addEventListener("click", () => {
    window.sessionStorage.setItem("food", "Burrito");
    window.location.href = "TamalesOrder.html";
});

document.getElementById("quesadilla-button").addEventListener("click", () => {
    window.sessionStorage.setItem("food", "Quesadilla");
    window.location.href = "TamalesOrder.html";
});

document.getElementById("salad-button").addEventListener("click", () => {
    window.sessionStorage.setItem("food", "Salad");
    window.location.href = "TamalesOrder.html";
});

document.getElementById("tamales").addEventListener("click", () => {
    window.location.href = "Tamales.html";
});

document.getElementById("the-grill").addEventListener("click", () => {
    window.location.href = "TheGrill.html";
});

document.getElementById("tavola").addEventListener("click", () => {
    window.location.href = "Tavola.html";
});

document.getElementById("deli-delish").addEventListener("click", () => {
    window.location.href = "DeliDelish.html";
});

document.getElementById("wasabi").addEventListener("click", () => {
    window.location.href = "Wasabi.html";
});

document.getElementById("greenfields").addEventListener("click", () => {
    window.location.href = "Greenfields.html";
});

document.getElementById("star-ginger").addEventListener("click", () => {
    window.location.href = "StarGinger.html";
});

document.getElementById("home").addEventListener("click", () => {
    window.location.href = "Homepage.html";
});

document.getElementById("cart").addEventListener("click", () => {
    window.location.href = "Cart.html";
});