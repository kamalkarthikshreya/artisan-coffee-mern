const products = [
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Cappuccino is a latte made with more foam than steamed milk, often topped with cocoa powder.',
        price: '$3.50',
        rating: 4.9,
        image: '/coffee/cappuccino.svg',
        features: ['Espresso', 'Steamed Milk', 'Foam']
    },
    {
        id: 'latte',
        name: 'Latte',
        description: 'Latte is a coffee drink made with espresso and steamed milk. Rich, creamy, balanced.',
        price: '$4.00',
        rating: 5.0,
        image: '/coffee/latte.svg',
        features: ['Espresso', 'Steamed Milk', 'Light Foam']
    },
    {
        id: 'mocha',
        name: 'Mocha',
        description: 'Mocha is a coffee beverage where dark espresso meets rich chocolate and creamy milk.',
        price: '$4.50',
        rating: 4.7,
        image: '/coffee/mocha.svg',
        features: ['Espresso', 'Chocolate', 'Steamed Milk']
    }
];

module.exports = products;
