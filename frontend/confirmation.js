function getAllItemIdOfTypeInCart(type, cart){
    var articles = [];
    cart.forEach(article => {
        if(article.type === type){
            articles.push(article.id);
        }
    });
    return articles;
}

function order_cart(type, body){
    fetch(`http://localhost:3000/api/${type}/order`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(result){
        if(!result.ok){
            throw new Error('La requête a échoué avec un status ' + result.status);
        }
        return result.json();
    })
    .then(function(data){

    })
    .catch(function(error){
        console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", function(){
    const firstname_field = document.querySelector('#firstName');
    const lastname_field = document.querySelector('#lastName');
    const email_field = document.querySelector('#email');
    const address_field = document.querySelector('#address');
    const city_field = document.querySelector('#city');

    const submit_button = document.querySelector('#submit');

    const cart = JSON.parse(localStorage.getItem('cart'));
    if(cart.length === 0){
        alert("Votre panier est vide. Merci d'ajouter un article avant de confirmer.")
        window.location.href = 'index.html';
    }

    submit_button.addEventListener('click', function(e){
        e.preventDefault();
        const cameras = getAllItemIdOfTypeInCart('cameras', cart);
        const furniture = getAllItemIdOfTypeInCart('furniture', cart);
        const teddies = getAllItemIdOfTypeInCart('teddies', cart);

        const body = {
            contact: {
                firstName: firstname_field.value,
                lastName: lastname_field.value,
                address: address_field.value,
                city: city_field.value,
                email: email_field.value
            }
        };

        order_cart('cameras', {...body, products: cameras});
        order_cart('furniture', {...body, products: furniture});
        order_cart('teddies', {...body, products: teddies});

        localStorage.setItem('cart', JSON.stringify([]));

        alert('Votre commande a été passée avec succès');
        window.location.href = 'index.html';
    });
});