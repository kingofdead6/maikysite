const menuData = {
    pizza: ['Margherita', 'Pepperoni', 'BBQ Chicken', 'Hawaiian', 'Veggie'],
    taco: ['Beef', 'Chicken', 'Fish', 'Veggie', 'Carnitas'],
    burger: ['Cheeseburger', 'Bacon Burger', 'Veggie Burger', 'Chicken Burger', 'BBQ Burger']
};

function showTastes(food) {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('tastes').style.display = 'block';
    document.getElementById('food-title').innerText = `${food.charAt(0).toUpperCase() + food.slice(1)} Tastes`;

    const tastesList = document.getElementById('tastes-list');
    tastesList.innerHTML = '';
    menuData[food].forEach(taste => {
        const listItem = document.createElement('li');
        listItem.innerText = taste;
        listItem.onclick = () => addToBasket(taste);
        tastesList.appendChild(listItem);
    });
}

function goBack() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('tastes').style.display = 'none';
}

function addToBasket(taste) {
    const basketList = document.getElementById('basket-list');
    const basketItem = document.createElement('li');
    basketItem.innerText = taste;
    basketList.appendChild(basketItem);
    saveBasket();
}

function saveBasket() {
    const basket = Array.from(document.getElementById('basket-list').children).map(item => item.innerText);
    localStorage.setItem('basket', JSON.stringify(basket));
}

function loadBasket() {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketList = document.getElementById('basket-list');
    basketList.innerHTML = '';
    basket.forEach(item => {
        const basketItem = document.createElement('li');
        basketItem.innerText = item;
        basketList.appendChild(basketItem);
    });
}

function toggleBasket() {
    const dropdown = document.getElementById('basket-dropdown');
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        loadBasket(); // Load basket items when showing the dropdown
    } else {
        dropdown.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', loadBasket);
