const recipes2 = [
    {
        id: 1,
        name: 'Pizza',
        image: require('../assets/img/pizza.jpg'),
        ingredients: [
            {
                name: "tomato sauce",
                quantity: '1/2L'
            },
            {
                name: "chesse",
                quantity: '2lb'
            },
            {
                name: "flour",
                quantity: '1lb'
            }
        ],
        steps: [
            {
                number: 1,
                step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                number: 2,
                step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                number: 3,
                step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            }
        ]
    },
    {
        id: 2,
        name: 'Salad',
        image: require('../assets/img/salad.jpg'),
        ingredients: [
            {
                name: "tomato",
                quantity: 3
            },
            {
                name: "cucumber",
                quantity: 2
            },
            {
                name: "onion",
                quantity: 1
            }
        ],
        steps: [
            {
                number: 1,
                step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                number: 2,
                step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                number: 3,
                step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            }
        ]
    },
    {
        id: 3,
        name: 'Bugritos',
        image: require('../assets/img/burrito.jpg'),
        ingredients: [
            {
                name: "tortilla",
                quantity: 10
            },
            {
                name: "meat",
                quantity: '3lb'
            },
            {
                name: "salad"
            }
        ],
        steps: [
            {
                number: 1,
                step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                number: 2,
                step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                number: 3,
                step: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            }
        ]
    }
];

export default recipes2;