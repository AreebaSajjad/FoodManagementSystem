require('dotenv').config();
const foodRoutes = require('./routes/foodRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/foods', foodRoutes);

// ✅ Ab Atlas connection hai
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://alishbasajjad4950_db_user:CeP5dcdUm6G30qHI@m0.n4dpg7s.mongodb.net/foodDB?appName=M0";

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Atlas Connected ✅"))
    .catch(err => console.log("Error: ❌", err));

app.get('/', (req, res) => res.send("Server is Running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));