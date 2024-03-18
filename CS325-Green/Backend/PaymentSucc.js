window.addEventListener("load",function(){
    window.sessionStorage.setItem("Cart", "");
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

document.getElementById("wasabi").addEventListener("click", () => {
    window.location.href = "Wasabi.html";
});

document.getElementById("greenfields").addEventListener("click", () => {
    window.location.href = "Greenfields.html";
});

document.getElementById("star-ginger").addEventListener("click", () => {
    window.location.href = "StarGinger.html";
});


document.getElementById("cart").addEventListener("click", () => {
    window.location.href = "Cart.html";
});

document.getElementById("to-home").addEventListener("click", () => {
    window.location.href = "Homepage.html";
});
