function getTypeItem(type, id, callback){
    fetch(`http://localhost:3000/api/${type}/${id}`, {method:'GET'})
    .then(function(result){
        if(!result.ok){
            throw new Error('La requête a échoué avec un status ' + result.status);
        }
        return result.json();
    })
    .then(function(data){
        callback(data);
    })
    .catch(function(error){
        console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", function(){
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
        if(localStorage.getItem('cart') === null){
            console.log("Panier vide");
        }
        else{
            var cart_list = document.querySelector('#cart_list');
            var cart = JSON.parse(localStorage.getItem('cart'));
            if(cart.length === 0){
                document.querySelector('#buy_url').classList.add('hidden');
                document.querySelector('#empty_cart').innerHTML = `
                    <p class="mx-8 text-lg">Votre panier est vide.</p>
                `;
            }
            else {
                let total_price = 0;
                cart.forEach(article => {
                    getTypeItem(article.type, article.id, function(data){
                        var cat = [];
                        if(article.type === "cameras"){
                            cat = data.lenses;
                        }
                        else if(article.type === 'teddies'){
                            cat = data.colors;
                        }
                        else if(article.type === 'furniture'){
                            cat = data.varnish;
                        }
    
                        cart_list.innerHTML += `
                            <li class="bg-white shadow-md p-4 rounded-lg flex justify-between items-center mb-4">
                                <div class="flex items-center">
                                    <img class="h-8 w-8 mr-2" src="${data.imageUrl}" alt="Product Image">
                                    <span>${data.name}</span>
                                </div>
                                <div class="flex items-center">
                                    <span class="px-8">Déclinaison : ${cat[article.declinaison]}</span>
                                    <span>Prix : ${data.price}€</span>
                                </div>
                            </li>
                        `;
                        total_price += data.price;
                    });
                });
                setTimeout(function(){
                    cart_list.innerHTML += `
                        <li class="bg-white shadow-md p-4 rounded-lg flex justify-between items-center mb-4">
                            <div class="flex items-center">
                                <span>Prix total</span>
                            </div>
                            <div class="flex items-center">
                                <span>${total_price}€</span>
                            </div>
                        </li>
                    `;
                    console.log(total_price);
                }, 100);
            }
        }
    } 
    else{
        console.log("Le localStorage n'est pas pris en charge dans ce navigateur.");
    }
});