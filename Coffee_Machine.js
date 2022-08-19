const input = require('sync-input');

let supply = {
    water: 400,
    milk: 540, 
    beans: 120, 
    cups: 9, 
    money: 550,   
};

const syrups = [
    {name: 'hazelnut', amount: 200},
    {name: 'almond', amount: 200},
    {name: 'vanilla', amount: 100},
    {name: 'no syrup', amount: 0},
];

const syrupsPrice = 2;
const syrupsPerServingMl = 10;
    
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
    ${syrups[0].amount} ml of hazelnut syrup
    ${syrups[1].amount} ml of almond syrup
    ${syrups[2].amount} ml of vanilla syrup
    $${supply.money} of money`);
}

function checkSupplies(typeOfCoffee, selectedSyrup) {
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
    } else if (syrups[selectedSyrup].amount - syrupsPerServingMl < 0) {
        if (selectedSyrup !== syrups.findIndex(el => el.name === 'no syrup')) { 
            console.log('Sorry, not enough syrup!');
            return false; 
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function makingCoffee(beverage, chosenSyrup) {
    if (checkSupplies(beverage, chosenSyrup)) {
        console.log('I have enough resources, making you a coffee! \n');
        supply.water -= beverages[beverage].water;
        supply.milk -= beverages[beverage].milk;
        supply.beans -= beverages[beverage].beans;
        syrups[chosenSyrup].amount -= syrupsPerServingMl;
        supply.cups -= 1;
        supply.money += beverages[beverage].price;
        supply.money += syrupsPrice;
    }
}

function buy() {
    const choice = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: \n');
    if (choice === 'back') {
        return;
    }
    const beverage = Number(choice) - 1;
    const answerOne = input('Would you like to add syrup? Choose "yes" or "no".');
    if (answerOne.toLowerCase() === 'no') {
        makingCoffee(beverage, syrups.findIndex(el => el.name === 'no syrup'));
        return;
    } 
    const answerTwo = input(`What kind of syrup would you like to add?
        1 - hazelnut, 2 - almond, 3 - vanilla or back - to main menu: \n'`);
    if (answerTwo === 'back') {
        return;
    }    
    const chosenSyrup = Number(answerTwo) - 1; 
    makingCoffee(beverage, chosenSyrup);
}

function fill() {
    supply.water += Number(input('Write how many ml of water you want to add: \n'));
    supply.milk += Number(input('Write how many ml of milk you want to add: \n'));
    supply.beans += Number(input('Write how many grams of coffee beans you want to add: \n'));
    supply.cups += Number(input('Write how many disposable coffee cups you want to add: \n'));
    syrups[0].amount += Number(input('Write how many ml of hazelnut syrup you want to add: \n'));
    syrups[1].amount += Number(input('Write how many ml of almond syrup you want to add: \n'));
    syrups[2].amount+= Number(input('Write how many ml of vanilla syrup you want to add: \n'));
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