export const recipes = (ingredients: any) => [
  {
    title: "Tomato Rice with Chicken",
    description:
      "A flavorful blend of tomato-infused rice topped with juicy chicken pieces, enhanced by a squeeze of fresh lemon juice",
    ingredients: [
      { id: ingredients.rice.id, ingredient: "rice", quantity: 2 },
      { id: ingredients.tomato.id, ingredient: "tomato", quantity: 4 },
      { id: ingredients.chicken.id, ingredient: "chicken", quantity: 1 },
      { id: ingredients.onion.id, ingredient: "onion", quantity: 1 },
      { id: ingredients.lemon.id, ingredient: "lemon", quantity: 5 },
    ],
    cover:
      "https://res.cloudinary.com/saponestore/image/upload/v1718611149/Food/etqjhsijct3omblih2gs.webp",
    instructions: [
      "Cook the rice according to package instructions.",
      "In a pan, sauté chopped onions until golden.",
      "Add diced tomatoes and cook until soft.",
      "Add chicken pieces and cook until done.",
      "Mix the cooked rice with the tomato and chicken mixture.",
      "Squeeze lemon juice over the dish before serving.",
    ],
  },
  {
    title: "Cheesy Potato Meatballs",
    description:
      "Delicious meatballs made with mashed potatoes, ground meat, and cheese, perfect for baking or frying. Served with a side of ketchup.",
    ingredients: [
      { id: ingredients.potato.id, ingredient: "potato", quantity: 4 },
      { id: ingredients.meat.id, ingredient: "meat", quantity: 5 },
      { id: ingredients.onion.id, ingredient: "onion", quantity: 1 },
      { id: ingredients.ketchup.id, ingredient: "ketchup", quantity: 3 },
      { id: ingredients.cheese.id, ingredient: "cheese", quantity: 4 },
    ],
    cover:
      "https://res.cloudinary.com/saponestore/image/upload/v1718611149/Food/psixr29nlnxpbfe9qwta.webp",
    instructions: [
      "Boil and mash the potatoes.",
      "Mix the mashed potatoes with ground meat, finely chopped onions, and grated cheese.",
      "Form the mixture into balls.",
      "Bake or fry the meatballs until fully cooked.",
      "Serve with ketchup on the side.",
    ],
  },
  {
    title: "Chicken Lettuce Wraps",
    description:
      "Shredded chicken mixed with finely chopped onions and tomatoes, wrapped in fresh lettuce leaves with a zesty lemon juice finish.",
    ingredients: [
      { id: ingredients.chicken.id, ingredient: "chicken", quantity: 5 },
      { id: ingredients.lettuce.id, ingredient: "lettuce", quantity: 10 },
      { id: ingredients.onion.id, ingredient: "onion", quantity: 1 },
      { id: ingredients.tomato.id, ingredient: "tomato", quantity: 5 },
      { id: ingredients.lemon.id, ingredient: "lemon", quantity: 3 },
    ],
    cover:
      "https://res.cloudinary.com/saponestore/image/upload/v1718611149/Food/epxavgnm7jjhvvdddaah.webp",
    instructions: [
      "Cook the chicken and shred it into small pieces.",
      "Chop the onions and tomatoes finely.",
      "Mix the shredded chicken with the chopped onions and tomatoes.",
      "Squeeze lemon juice over the mixture.",
      "Spoon the mixture into large lettuce leaves and wrap.",
    ],
  },
  {
    title: "Lemon Chicken and Rice",
    description:
      "A savory dish of rice mixed with sautéed chicken and onions, topped with a generous squeeze of lemon juice for a refreshing taste.",
    ingredients: [
      { id: ingredients.rice.id, ingredient: "rice", quantity: 5 },
      { id: ingredients.chicken.id, ingredient: "chicken", quantity: 5 },
      { id: ingredients.lemon.id, ingredient: "lemon", quantity: 10 },
      { id: ingredients.onion.id, ingredient: "onion", quantity: 2 },
    ],
    cover:
      "https://res.cloudinary.com/saponestore/image/upload/v1718611149/Food/v26jsfqlr2wkcn7uvf5j.webp",
    instructions: [
      "Cook the rice according to package instructions.",
      "In a pan, sauté chopped onions until golden.",
      "Add chicken pieces and cook until done.",
      "Mix the cooked rice with the chicken and onions.",
      "Squeeze lemon juice over the dish before serving.",
    ],
  },
  {
    title: "Tomato and Cheese Stuffed Potatoes",
    description:
      "Baked potatoes filled with a savory mix of mashed potatoes, diced tomatoes, chopped onions, and melted cheese, baked to perfection.",
    ingredients: [
      { id: ingredients.potato.id, ingredient: "potato", quantity: 10 },
      { id: ingredients.tomato.id, ingredient: "tomato", quantity: 5 },
      { id: ingredients.cheese.id, ingredient: "cheese", quantity: 10 },
      { id: ingredients.onion.id, ingredient: "onion", quantity: 2 },
    ],
    cover:
      "https://res.cloudinary.com/saponestore/image/upload/v1718611149/Food/rf8sgq2jyoazqoggabjt.webp",
    instructions: [
      "Bake the potatoes until tender.",
      "Scoop out the insides and mash them.",
      "Mix the mashed potato with diced tomatoes, chopped onions, and grated cheese.",
      "Stuff the mixture back into the potato skins.",
      "Bake until the cheese is melted and bubbly.",
    ],
  },
  {
    title: "Meat and Rice Lettuce Rolls",
    description:
      "A hearty mix of rice and browned meat wrapped in crisp lettuce leaves, served with a side of ketchup for dipping.",
    ingredients: [
      { id: ingredients.tomato.id, ingredient: "tomato", quantity: 5 },
      { id: ingredients.lemon.id, ingredient: "lemon", quantity: 5 },
      { id: ingredients.potato.id, ingredient: "potato", quantity: 5 },
      { id: ingredients.rice.id, ingredient: "rice", quantity: 2 },
      { id: ingredients.ketchup.id, ingredient: "ketchup", quantity: 3 },
      { id: ingredients.lettuce.id, ingredient: "lettuce", quantity: 1 },
      { id: ingredients.onion.id, ingredient: "onion", quantity: 1 },
      { id: ingredients.cheese.id, ingredient: "cheese", quantity: 7 },
      { id: ingredients.meat.id, ingredient: "meat", quantity: 8 },
      { id: ingredients.chicken.id, ingredient: "chicken", quantity: 2 },
    ],
    cover:
      "https://res.cloudinary.com/saponestore/image/upload/v1718611149/Food/ju4rt0ctyw4e9pxnghqr.webp",
    instructions: [
      "Cook the rice according to package instructions.",
      "Brown the meat in a pan with chopped onions.",
      "Mix the cooked rice with the meat and onions.",
      "Spoon the mixture into large lettuce leaves and roll.",
      "Serve with ketchup on the side.",
    ],
  },
];
