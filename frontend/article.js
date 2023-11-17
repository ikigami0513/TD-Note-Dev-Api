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
    const url = new URL(window.location.href);
    const type = url.searchParams.get('type');
    const id = url.searchParams.get('id');

    getTypeItem(type, id, function(data){
        document.querySelector('#item_img').src = data.imageUrl;
        document.querySelector('#item_name').innerHTML = data.name;
        document.querySelector('#item_description').innerHTML = data.description;
        document.querySelector('#item_price').innerHTML = `${data.price}€`;

        var cat = [];
        if(type === "cameras"){
            cat = data.lenses;
        }
        else if(type === 'teddies'){
            cat = data.colors;
        }
        else if(type === 'furniture'){
            cat = data.varnish;
        }

        var item_cat = document.querySelector('#item_cat');
        for (let index = 0; index < cat.length; index++) {
            var option = document.createElement('option');
            option.value = index;
            option.innerHTML = cat[index];
            item_cat.appendChild(option);
        }

        var add_cart = document.querySelector('#add_cart');
        add_cart.addEventListener("click", function(){
            if (typeof localStorage !== 'undefined' && localStorage !== null) {
                if(localStorage.getItem('cart') === null){
                    localStorage.setItem('cart', JSON.stringify([]));
                }

                var cart = JSON.parse(localStorage.getItem('cart'));
                cart.push({
                    id: id,
                    type: type,
                    declinaison: document.querySelector('#item_cat').value
                });
                localStorage.setItem('cart', JSON.stringify(cart));

                alert(`L'article ${data.name} a bien été ajouté à votre panier`);
                window.location.href = 'index.html';
            } 
            else{
                console.log("Le localStorage n'est pas pris en charge dans ce navigateur.");
            }
        });
    });
});