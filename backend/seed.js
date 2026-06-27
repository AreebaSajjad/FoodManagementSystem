const mongoose = require('mongoose');
const Food = require('./models/Food');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || "mongodb://alishbasajjad4950_db_user:CeP5dcdUm6G30qHI@ac-tm11stp-shard-00-00.n4dpg7s.mongodb.net:27017,ac-tm11stp-shard-00-01.n4dpg7s.mongodb.net:27017,ac-tm11stp-shard-00-02.n4dpg7s.mongodb.net:27017/foodDB?ssl=true&replicaSet=atlas-veqy10-shard-0&authSource=admin&retryWrites=true&w=majority&appName=M0";

const foodItems = [
  // 🍔 Fast Food
  {
    name: "Classic Beef Burger",
    price: 450,
    category: "Fast Food",
    description: "Juicy beef patty with lettuce, tomato, and special sauce in a toasted bun."
  },
  {
    name: "Crispy Chicken Burger",
    price: 399,
    category: "Fast Food",
    description: "Golden fried chicken fillet with coleslaw and mayo in a soft brioche bun."
  },
  {
    name: "Loaded Cheese Fries",
    price: 299,
    category: "Fast Food",
    description: "Crispy golden fries smothered in melted cheddar cheese and jalapeños."
  },
  {
    name: "Club Sandwich",
    price: 350,
    category: "Fast Food",
    description: "Triple-decker sandwich with chicken, bacon, egg, lettuce, and tomato."
  },

  // 🍕 Pizza
  {
    name: "Pepperoni Pizza",
    price: 899,
    category: "Pizza",
    description: "Classic Italian pizza loaded with pepperoni slices and mozzarella cheese."
  },
  {
    name: "BBQ Chicken Pizza",
    price: 949,
    category: "Pizza",
    description: "Smoky BBQ sauce base with grilled chicken, red onions, and cheddar."
  },
  {
    name: "Margherita Pizza",
    price: 749,
    category: "Pizza",
    description: "Fresh tomato sauce, buffalo mozzarella, and basil on a thin crispy crust."
  },

  // 🍝 Main Course
  {
    name: "Creamy Pasta Alfredo",
    price: 550,
    category: "Main Course",
    description: "Fettuccine pasta in rich creamy Alfredo sauce with grilled chicken strips."
  },
  {
    name: "Grilled Steak",
    price: 1299,
    category: "Main Course",
    description: "200g premium beef steak grilled to perfection, served with mashed potatoes and veggies."
  },
  {
    name: "Chicken Tikka Pasta",
    price: 599,
    category: "Main Course",
    description: "Penne pasta tossed with spicy chicken tikka in a tomato cream sauce."
  },

  // 🍰 Desserts
  {
    name: "Chocolate Lava Cake",
    price: 349,
    category: "Desserts",
    description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream."
  },
  {
    name: "Red Velvet Brownie",
    price: 249,
    category: "Desserts",
    description: "Dense, fudgy red velvet brownie topped with cream cheese frosting."
  },
  {
    name: "Nutella Waffle Cake",
    price: 299,
    category: "Desserts",
    description: "Stacked crispy waffles layered with Nutella, banana slices, and whipped cream."
  },

  // 🥤 Drinks
  {
    name: "Blue Lagoon Mocktail",
    price: 299,
    category: "Drinks",
    description: "Refreshing blue curacao syrup, lemon juice, and sprite topped with a cherry."
  },
  {
    name: "Mint Margarita",
    price: 249,
    category: "Drinks",
    description: "Chilled fresh mint, lime juice, and sugar syrup blended to perfection."
  },
  {
    name: "Mango Passion Juice",
    price: 199,
    category: "Drinks",
    description: "Fresh mango blended with passion fruit and a hint of ginger. Pure tropical bliss."
  },
  {
    name: "Iced Caramel Latte",
    price: 349,
    category: "Drinks",
    description: "Cold espresso shots with caramel syrup, milk, and ice — a coffee lover's dream."
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected!");

    await Food.deleteMany({});
    console.log("🗑️  Old data cleared.");

    await Food.insertMany(foodItems);
    console.log(`🌱 ${foodItems.length} food items added successfully!`);

    console.log("\n📋 Items added:");
    foodItems.forEach(item => {
      console.log(`   ✔ ${item.name} (${item.category}) — Rs. ${item.price}`);
    });

    console.log("\n🎉 Database seeded! Run your server now.");
    process.exit(0);

  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedDB();