
const input = require('sync-input')

let supply = {
    water: 400,
    milk: 540, 
    beans: 120, 
    cups: 9, 
    money: 550,
};
    
const beverages = [
    {name: 'espresso', water: 250, milk: 0, beans: 16, price: 4},
    {name: 'latte', water: 350, milk: 75, beans: 20, price: 7},
    {name: 'cappuccino', water: 200, milk: 100, beans: 12, price: 6},
];

function greetingMessage() {
    console.log(`The coffee machine has:
    ${supply.water} ml of water
    ${supply.milk} ml of milk
    ${supply.beans} g of coffee beans
    ${supply.cups} disposable cups
    $${supply.money} of money`);
}

function checkSupplies(typeOfCoffee) {
    if (supply.cups < 1) {
        console.log('Sorry, not enough cups!');
        return false;
    } else if (supply.water - beverages[typeOfCoffee].water < 0) {
        console.log('Sorry, not enough water!');
        return false;
    } else if (supply.milk - beverages[typeOfCoffee].milk < 0) {
        console.log('Sorry, not enough milk!');
        return false;
    } else if (supply.beans - beverages[typeOfCoffee].beans < 0) {
        console.log('Sorry, not enough beans!');
        return false;
    } else {
        return true;
    }
}

function makingCoffee(beverage) {
    if (checkSupplies(beverage)) {
        console.log('I have enough resources, making you a coffee! \n');
        supply.water -= beverages[beverage].water;
        supply.milk -= beverages[beverage].milk;
        supply.beans -= beverages[beverage].beans;
        supply.cups -= 1;
        supply.money += beverages[beverage].price;
    }
}

function buy() {
    const choice = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: \n');
    if (choice === 'back') {
        return;
    }
    const beverage = Number(choice) - 1;
    makingCoffee(beverage);
}

function fill() {
    supply.water += Number(input('Write how many ml of water you want to add: \n'));
    supply.milk += Number(input('Write how many ml of milk you want to add: \n'));
    supply.beans += Number(input('Write how many grams of coffee beans you want to add: \n'));
    supply.cups += Number(input('Write how many disposable coffee cups you want to add: \n'));
}

function take() {
    console.log(`I take you $${supply.money} \n`);
    supply.money = 0;
}

let exit = false;
while (!exit) {
    const action = input('Write action (buy, fill, take, remaining, exit): \n');
    switch (action) {
        case 'buy':
            buy();
            break;
        case 'fill':
            fill();
            break;
        case 'take':
            take();
            break;
        case 'remaining':
            greetingMessage();
            break;
        case 'exit':
            exit = true;
            break;
        default:
            console.log('Please, choose one of the possible actions');
            break;
    }
} 