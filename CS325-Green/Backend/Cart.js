function parse_cart(){
    clear_strings(); //clears restaurant string to avoid items showing up multiple times due to an event such as a refresh 
    let cart_string = window.sessionStorage.getItem("Cart");
    if(cart_string == null || cart_string.length === 0){  
        return;
    }
    cart_string = cart_string.substring(1); // to get rid of the first | marker
    let cart_lines = cart_string.split("|"); // unique identifer used to split the cart objects into an array
    let cart_arr = []
    for(var i in cart_lines){
        let obj = JSON.parse(cart_lines[i]) 
        cart_arr.push(obj);                 //parses each item as a json and then makes an array of json objects    
    }
    let total_price = 0;
    cart_arr.forEach(item =>{
        let item_price = 0;
        let addons_price = 0;
        let item_string = ""; 
        let values = Object.values(item)
        let keys = Object.keys(item);
        let restaurant = values[0];
        let temp_string = restaurant + "_present";
        window.sessionStorage.setItem(temp_string, restaurant);     //enables header to appear for given restaurant
        if(values[1] !== null && values[1].length !== 0){
            item_string = values[1] + " - "
            item_price += price_check(values[1], restaurant);
            if(keys[2] == "Addons"){
                item_string = item_string.substring(0,item_string.length -2);
            }
        }
        for( i =2; i< values.length; i++){
            if(values[i] === null || values[i].length === 0){
                continue;
            }
            if (keys[i] == "Instructions"){
                continue;
            }
            if(Array.isArray(values[i])){
                if(keys[i] == "Addons"){
                    addons_price = price_check(values[i],restaurant)
                    item_string += " $" + item_price.toFixed(2) + "<br> Addons: " 
                    item_price += addons_price     
                }
                if(keys[i] == "Toppings"){
                    item_price += price_check(values[i],restaurant)
                }
                values[i].forEach( arr_item => {
                    item_string += arr_item + ", ";
                });
                item_string = item_string.substring(0,item_string.length -2);  
                continue;
            }
            item_price += price_check(values[i], restaurant);
            item_string += values[i]+ ", ";
        };
        if(keys.includes("Addons") && item["Addons"].length != 0){
            item_string += " $" + addons_price.toFixed(2)
        }
        else{
            item_string += " $" + item_price.toFixed(2)
        }
        total_price += item_price;
        let retrieval_string = restaurant + "_string";
        let rest_string = window.sessionStorage.getItem(retrieval_string); 
        if(rest_string === null){
            rest_string = "";
        }
        rest_string +=item_string + "<br>";   
        window.sessionStorage.setItem(retrieval_string, rest_string);
    });
    window.sessionStorage.setItem("Price",total_price.toString());
}

function price_check(elem,restaurant){
    let retrieval_string = restaurant + "_prices";
    let prices = JSON.parse(window.sessionStorage.getItem(retrieval_string));
    let total_price = 0;
    if (Array.isArray(elem) ){
        elem.forEach(topping =>{
            if (topping in prices){
                total_price += prices[topping];
            }
        })
    }
    else{
        if (elem in prices ){
           total_price = prices[elem];
     }
    }      
    return total_price;
}
function create_remove_form(restaurant){
    var popup = document.getElementById(restaurant+ "-modal");
    let form = document.getElementById(restaurant + "-form");
    while(form.firstChild){
        form.removeChild(form.firstChild);
    }
    popup.style.display = "block"
    let cart_string = window.sessionStorage.getItem("Cart");
    if(cart_string == null || cart_string.length === 0){
        return;
    }
    cart_string = cart_string.substring(1); // to get rid of the first | marker
    let cart_lines = cart_string.split("|"); // unique identifer used to split the cart objects into an array
    let cart_arr = []
    for(var i in cart_lines){
        let obj = JSON.parse(cart_lines[i]) 
        cart_arr.push(obj);                 //parses each item as a json and then makes an array of json objects    
    }
    cart_arr.forEach(item =>{
        var values = Object.values(item)
        if(values[0] !== restaurant){return;}
        values.shift()
        if(values[0] === null || values[0].length === 0){
            values.shift()
        }
        var input = document.createElement("input")
        input.type = 'checkbox';
        input.value = standardize_array(values);
        var br = document.createElement("br");
        form.appendChild(input);
        form.appendChild(br);
    });
    document.getElementsByClassName("close")[0].addEventListener("click", () =>{
        popup.style.display = "none";
    });
}
function remove_items(restaurant){
    var form = document.getElementById(restaurant+ "-form");
    var inputs = form.children;
    var products =[];
    let cart_string = window.sessionStorage.getItem("Cart");
    let allowed_remove = 0;
    let num_removed = 0;
    if(cart_string == null || cart_string.length === 0){
        return;
    }
    cart_string = cart_string.substring(1); // to get rid of the first | marker
    let cart_lines = cart_string.split("|"); // unique identifer used to split the cart objects into an array
    let cart_arr = []
    for(var i in cart_lines){
        let obj = JSON.parse(cart_lines[i]) 
        cart_arr.push(obj);            //parses each item as a json and then makes an array of json objects    
    }
    for(var i =0; i< inputs.length; i++){
        if(inputs[i].checked){
            allowed_remove += 1;
            let arr = inputs[i].value.split(",");
            products.push(arr)
        }
    }
    for(var i = 0; i< cart_arr.length;i++){
        console.log(cart_arr)
        let item_values = Object.values(cart_arr[i]);
        item_values.shift();
        item_values = standardize_array(item_values);
        products.every(toRemove=>{
            if(num_removed == allowed_remove){
                return true;
            }
            let product_values = standardize_array(Object.values(toRemove))
            if(check_equal(product_values,item_values)){
                num_removed += 1;
                console.log(1)
                cart_arr.splice(i,1);
                i--;
                return false;
            }
            return true;
        })
        
    }
    build_cart(cart_arr);
    document.getElementById(restaurant+"-modal").style.display = "none";
}
function clear_strings(){
    let restaurants = ["Tamales", "Greenfields", "Tavola", "The Grill", "Wasabi", "Star Ginger", "Deli Delish"];
    restaurants.forEach(rest =>{
        let remove_string = rest + "_string";
        let remove_present = rest + "_present"
        window.sessionStorage.setItem(remove_string,"");
        window.sessionStorage.setItem(remove_present, "");
    });
    window.sessionStorage.setItem("Price", 0);
}
function check_equal(a, b){
    return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}
function build_cart(arr){
    let cart = ""
    arr.forEach(item=>{
        if(cart.length !== 0) {
            cart+="\n";
        }
        cart+= "|" + JSON.stringify(item); // | is an end of line indicator in order to split the stored string into items
    });
    window.sessionStorage.setItem("Cart", cart);
}
function standardize_array(arr){
    let toReturn = []
    arr.forEach(item =>{
        if(Array.isArray(item)){
            item.forEach(topping =>{
                toReturn.push(topping);
            });
        }
        else{
            if(item.length === 0){
                return;
            }
            toReturn.push(item)
        }
    });
    return toReturn;
}
window.addEventListener("load",function() {
    let tamales_prices = {'Beef':8.50, 'Chicken':8.50, 'Carnitas': 8.50, 'Pork': 8.50, 'Lentils': 7.00, 'Guacamole':1.50};
    window.sessionStorage.setItem("Tamales_prices", JSON.stringify(tamales_prices));
    let starginger_prices = {"Orange Chicken": 9.50, "Curry Special":9.50, "Thai BBQ Chicken": 9.50, "Wok Special":9.50, "Tofu Special":9.50,"Grill Special":9.50, "Extra Protein":3.00, "Pot Stickers (2)": 1.25, "Spring Roll": 1.25, "Fountain Drink":1.00};
    window.sessionStorage.setItem("Star Ginger_prices",JSON.stringify(starginger_prices));
    let tavola_prices = {"Margherita":9.00, "Chicken Pesto":9.50, "Piadina": 9.50, "Penne with Chicken": 9.00, "Rigatone": 9.00, "Penne with Sausage":9.00, "Falafel Bowl":9.00, "Beef Bowl":9.00, "Lamb Bowl":9.00, "Chicken Bowl":9.00, "Falafel Wrap":9.00, "Beef Wrap":9.00, "Lamb Wrap":9.00, "Chicken Wrap":9.00, "Falafel Salad":9.00, "Chicken Salad":9.00, "Beef Salad":9.00, "Lamb Salad":9.00, "Sabich":9.50, "Beef Skewers": 5.50, "Chicken Skewers": 4.50,  "Lamb Skewer": 5.50, "Falafel": 3.50, "Pita Bread":2.50, "Hummus":3.50}
    window.sessionStorage.setItem("Tavola_prices", JSON.stringify(tavola_prices));
    let greenfields_prices = {'Garden Salad':6.50, "Caesar Salad":6.50, "Southwestern Salad":7.50, "Fruit and Nut Salad":7.50, "Blue Wall Power Salad":8.50,"Buffalo Chicken Salad":9.00, "Mediterranean Salad":9.00, "Pesto Chicken Salad":9.50, "Cobb Salad":9.50, "Breaded Chicken Tenders":9.50,"Hard Boiled Egg":1.00,"Spiced Chickpeas":1.00, "Extra Wrap": 1.00,"Sweet Potato":1.00, "Hummus":1.50, "Extra Cheese":1.50, "Avacoda":1.50, "Tofu Bites":2.00, "Bacon":2.00, "Chicken":3.00};
    window.sessionStorage.setItem("Greenfields_prices", JSON.stringify(greenfields_prices));
    let wasabi_prices = {"Beef Teriyaki Don":9.50,"Chicken Teriyaki Don":9.50, "Chicken Katsu Don": 9.50, "Blue Wall Don": 9.50,"Pork Katsu Don": 9.50,"Beef Teppanyaki":9.50,"Chicken Teppanyaki":9.50,  "Spicy Salmon Bowl": 10.00,"Spicy Tuna Bowl": 10.00, "Shinkansen Sashimi": 9.50, "Shinkansen Tempura":9.50, "California Roll": 7.50 , "Vegetable Roll": 7.50, "Sweet Potato Tempura Roll": 7.50, "Spicy Tuna Roll":7.50, "Philadelphia Roll":7.50, "Pink Panther Roll" : 10.00, "Alaskan Roll": 10.00, "Poke Bowl": 10.00, "Paradise Roll": 10.00, "Tiger Roll":10.00, "Rainbow Roll":10.00, "Dragon Roll":10.00};
    window.sessionStorage.setItem("Wasabi_prices", JSON.stringify(wasabi_prices));
    let thegrill_prices = {'Single':5.00, 'Double':7.50,'Caramelized Onions' :0.75, 'Sauteed Mushrooms':0.75,'Sweet Potato Fries':3.50,'Fried Egg':1.50,'Extra Cheese':1.50, 'Avacoda':1.50, 'Bacon':2.00, 'French Fries':3.00,'Chicken Tenders':7.50,'Onions Rings':3.50,'Vanilla Milkshake':5.50, 'Chocolate Milkshake':5.50, 'Strawberry Milkshake':5.50, 'Speciality Milkshake':5.50};
    window.sessionStorage.setItem("The Grill_prices", JSON.stringify(thegrill_prices));
    let delidelish_prices = {"Three Cheese and Spinach":7.00, "The BLT":8.00, "Chicken Parmesan":8.00, "Meatball Grinder":8.50, "Caprese":7.50, " Chicken Bacon Ranch": 8.50, "Buffalo Chicken":8.50, "Chicken and Pesto":8.50, "Chicken Sald": 7.50, "Italian Cold Cut":8.00, "Classing Grinder":8.00, "Blue Wall Club":8.00, "Extra Cheese":1.50, "Fresh Avocado":1.50, "Bacon":2.00, "Extra Meat":3.00, "Chips and Drink":2.00};
    window.sessionStorage.setItem("Deli Delish_prices", JSON.stringify(delidelish_prices));
    parse_cart();
});

window.addEventListener("load", function() {
    document.getElementById("DeliDelish-present").innerHTML = window.sessionStorage.getItem("Deli Delish_present");
    document.getElementById("DeliDelish-order").innerHTML = window.sessionStorage.getItem("Deli Delish_string");
    if(window.sessionStorage.getItem('Deli Delish_present') == "Deli Delish"){
        document.getElementById("DeliDelish-button").classList.add("button");
        document.getElementById("DeliDelish-button").innerHTML = "Remove Item";
        document.getElementById("DeliDelish-button").style.background = "Red";
    } 
    else{
        document.getElementById("DeliDelish-button").hidden = true;
    }
});
window.addEventListener("load", function() {
    document.getElementById("Greenfields-present").innerHTML = window.sessionStorage.getItem("Greenfields_present");
    document.getElementById("Greenfields-order").innerHTML = window.sessionStorage.getItem("Greenfields_string");
    if(window.sessionStorage.getItem('Greenfields_present') == "Greenfields"){
        document.getElementById("Greenfields-button").classList.add("button");
        document.getElementById("Greenfields-button").innerHTML = "Remove Item";
        document.getElementById("Greenfields-button").style.background = "Red";
    } 
    else{
        document.getElementById("Greenfields-button").hidden = true;
    }
});
window.addEventListener("load", function() {
    document.getElementById("StarGinger-present").innerHTML = window.sessionStorage.getItem("Star Ginger_present");
    document.getElementById("StarGinger-order").innerHTML = window.sessionStorage.getItem("Star Ginger_string");
    if(window.sessionStorage.getItem('Star Ginger_present') == "Star Ginger"){
        document.getElementById("StarGinger-button").classList.add("button");
        document.getElementById("StarGinger-button").innerHTML = "Remove Item";
        document.getElementById("StarGinger-button").style.background = "Red";
    } 
    else{
        document.getElementById("StarGinger-button").hidden = true;
    }
});
window.addEventListener("load", function() {
    document.getElementById("Tamales-present").innerHTML = window.sessionStorage.getItem("Tamales_present");
    document.getElementById("Tamales-order").innerHTML = window.sessionStorage.getItem("Tamales_string");
    if(window.sessionStorage.getItem('Tamales_present') == "Tamales"){
        document.getElementById("Tamales-button").classList.add("button");
        document.getElementById("Tamales-button").innerHTML = "Remove Item";
        document.getElementById("Tamales-button").style.background = "Red";
    } 
    else{
        document.getElementById("Tamales-button").hidden = true;
    }
});
window.addEventListener("load", function() {
    document.getElementById("Tavola-present").innerHTML = window.sessionStorage.getItem("Tavola_present");
    document.getElementById("Tavola-order").innerHTML = window.sessionStorage.getItem("Tavola_string");
    if(window.sessionStorage.getItem('Tavola_present') == "Tavola"){
        document.getElementById("Tavola-button").classList.add("button");
        document.getElementById("Tavola-button").innerHTML = "Remove Item";
        document.getElementById("Tavola-button").style.background = "Red";
    } 
    else{
        document.getElementById("Tavola-button").hidden = true;
    }
});
window.addEventListener("load", function() {
    document.getElementById("TheGrill-present").innerHTML = window.sessionStorage.getItem("The Grill_present");
    document.getElementById("TheGrill-order").innerHTML = window.sessionStorage.getItem("The Grill_string");
    if(window.sessionStorage.getItem('The Grill_present') == "The Grill"){
        document.getElementById("TheGrill-button").classList.add("button");
        document.getElementById("TheGrill-button").innerHTML = "Remove Item";
        document.getElementById("TheGrill-button").style.background = "Red";
    } 
    else{
        document.getElementById("TheGrill-button").hidden = true;
    }
});
window.addEventListener("load", function() {
    document.getElementById("Wasabi-present").innerHTML = window.sessionStorage.getItem("Wasabi_present");
    document.getElementById("Wasabi-order").innerHTML = window.sessionStorage.getItem("Wasabi_string");
    if(window.sessionStorage.getItem('Wasabi_present') == "Wasabi"){
        document.getElementById("Wasabi-button").classList.add("button");
        document.getElementById("Wasabi-button").innerHTML = "Remove Item";
        document.getElementById("Wasabi-button").style.background = "Red";
    } 
    else{
        document.getElementById("Wasabi-button").hidden = true;
    }
});
window.addEventListener("load",function(){
    if(window.sessionStorage.getItem("Price") === null){
        let zero = 0;
        document.getElementById("Subtotal").innerHTML = "$" + zero.toFixed(2);
        document.getElementById("Tax").innerHTML ="$" + zero.toFixed(2) ;
        document.getElementById("Total").innerHTML = "$" + zero.toFixed(2);
        return;
    }
    let sub_price = parseFloat(window.sessionStorage.getItem("Price"));
    let sub = sub_price.toFixed(2);
    sub = "$"+ sub;
    let tax_price = sub_price * 0.0625;
    let tax = tax_price.toFixed(2);
    tax = "$" + tax;
    let total_price = sub_price +tax_price;
    let total = total_price.toFixed(2);
    total = "$" + total;

    document.getElementById("Subtotal").innerHTML = sub;
    document.getElementById("Tax").innerHTML = tax;
    document.getElementById("Total").innerHTML = total;
});
document.getElementById("Tamales-button").addEventListener("click", () => {
    create_remove_form("Tamales");
 });

document.getElementById("Tamales-submit").addEventListener("click", () => {
    remove_items("Tamales");
    location.reload();
 });

document.getElementById("TheGrill-button").addEventListener("click", () => {
    create_remove_form("The Grill");
 });

document.getElementById("The Grill-submit").addEventListener("click", () => {
    remove_items("The Grill");
    location.reload();
 });
document.getElementById("Greenfields-button").addEventListener("click", () => {
    create_remove_form("Greenfields");
 });

document.getElementById("Greenfields-submit").addEventListener("click", () => {
    remove_items("Greenfields");
    location.reload();
 });
  document.getElementById("Wasabi-button").addEventListener("click", () => {
    create_remove_form("Wasabi");
 });

document.getElementById("Wasabi-submit").addEventListener("click", () => {
    remove_items("Wasabi");
    location.reload();
 });
  document.getElementById("Tavola-button").addEventListener("click", () => {
    create_remove_form("Tavola");
 });

document.getElementById("Tavola-submit").addEventListener("click", () => {
    remove_items("Tavola");
    location.reload();
 });


document.getElementById("StarGinger-button").addEventListener("click", () => {
    create_remove_form("Star Ginger");
 });

document.getElementById("Star Ginger-submit").addEventListener("click", () => {
    remove_items("Star Ginger");
    location.reload();
 });
document.getElementById("DeliDelish-button").addEventListener("click", () => {
    create_remove_form("Deli Delish");
 });

document.getElementById("Deli Delish-submit").addEventListener("click", () => {
    remove_items("Deli Delish");
    location.reload();
 });
window.onclick = function(event) {
    if (event.target == document.getElementById("Tamales-modal")) {
        document.getElementById("Tamales-modal").style.display = "none";
    }
    if (event.target == document.getElementById("Deli Delish-modal")) {
        document.getElementById("Deli Delish-modal").style.display = "none";
    }
    if (event.target == document.getElementById("Star Ginger-modal")) {
        document.getElementById("Star Ginger-modal").style.display = "none";
    }
    if (event.target == document.getElementById("Tavola-modal")) {
        document.getElementById("Tavola-modal").style.display = "none";
    }
    if (event.target == document.getElementById("Wasabi-modal")) {
        document.getElementById("Wasabi-modal").style.display = "none";
    }
    if (event.target == document.getElementById("Greenfields-modal")) {
        document.getElementById("Greenfields-modal").style.display = "none";
    }
    if (event.target == document.getElementById("The Grill-modal")) {
        document.getElementById("The Grill-modal").style.display = "none";
      }
} 

document.getElementsByClassName("close")[0].addEventListener("click", () =>{
    popup.style.display = "none";
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