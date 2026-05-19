let products = [];

function loadData() {
    fetch('data.xml')
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(data, 'application/xml');
            let items = xml.querySelectorAll('product');
            
            products = [];
            items.forEach(item => {
                products.push({
                    id: item.getAttribute('id'),
                    category: item.getAttribute('category'),
                    name: item.querySelector('name').textContent,
                    price: item.querySelector('price').textContent,
                    image: item.querySelector('image').textContent
                });
            });
            
            console.log('Загружено товаров:', products.length);
        })
        .catch(error => console.log('Ошибка:', error));
}

function getProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(p => p.category === category);
}

// Получить товар по ID
function getProduct(id) {
    return products.find(p => p.id == id);
}