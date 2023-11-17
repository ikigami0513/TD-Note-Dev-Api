function getAllTypeItems(type, callback){
    fetch(`http://localhost:3000/api/${type}/`, {method: 'GET'})
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
    getAllTypeItems('cameras', function(data){
        const camera_list = document.querySelector("#camera_list");
        data.forEach(camera => {
            var lenses_html = "";
            camera.lenses.forEach(lense => {
                lenses_html += `
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2">${lense}</span>
                `;
            });
            camera_list.innerHTML += `
                <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                        <img class="w-full" src="${camera.imageUrl}" alt="Product Image">
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">${camera.name}</div>
                            <p class="text-gray-700 text-base">
                                ${camera.description}
                            </p>
                        </div>
                        <div class="px-6 py-4">
                            ${lenses_html}
                        </div>
                        <div class="px-6 py-4">
                            <span class="text-gray-700">Prix :</span>
                            <span class="font-bold text-xl text-gray-900">${camera.price}€</span>
                        </div>
                        <div class="px-6 py-4">
                            <a href="/frontend/article.html?type=cameras&id=${camera._id}">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Voir l'article
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
    });

    getAllTypeItems('furniture', function(data){
        const furniture_list = document.querySelector("#furnitures_list");
        data.forEach(furniture => {
            var varnish_html = "";
            furniture.varnish.forEach(varnish => {
                varnish_html += `
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2">${varnish}</span>
                `;
            });
            furniture_list.innerHTML += `
                <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                        <img class="w-full" src="${furniture.imageUrl}" alt="Product Image">
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">${furniture.name}</div>
                            <p class="text-gray-700 text-base">
                                ${furniture.description}
                            </p>
                        </div>
                        <div class="px-6 py-4">
                            ${varnish_html}
                        </div>
                        <div class="px-6 py-4">
                            <span class="text-gray-700">Prix :</span>
                            <span class="font-bold text-xl text-gray-900">${furniture.price}€</span>
                        </div>
                        <div class="px-6 py-4">
                            <a href="/frontend/article.html?type=furniture&id=${furniture._id}">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Voir l'article
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
    });

    getAllTypeItems('teddies', function(data){
        const teddies_list = document.querySelector("#teddies_list");
        data.forEach(teddie => {
            var color_html = "";
            teddie.colors.forEach(color => {
                color_html += `
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 my-1 text-sm font-semibold text-gray-700 mr-2">${color}</span>
                `;
            });
            teddies_list.innerHTML += `
                <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                        <img class="w-full" src="${teddie.imageUrl}" alt="Product Image">
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">${teddie.name}</div>
                            <p class="text-gray-700 text-base">
                                ${teddie.description}
                            </p>
                        </div>
                        <div class="px-6 py-4">
                            ${color_html}
                        </div>
                        <div class="px-6 py-4">
                            <span class="text-gray-700">Prix :</span>
                            <span class="font-bold text-xl text-gray-900">${teddie.price}€</span>
                        </div>
                        <div class="px-6 py-4">
                            <a href="/frontend/article.html?type=teddies&id=${teddie._id}">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Voir l'article
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
    });
});