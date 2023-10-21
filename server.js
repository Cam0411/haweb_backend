const express = require('express')
const db = require("./db/db.js")
const productRoute = require("./route/product-route.js")
const cors = require('cors');
require('dotenv').config();

const app = express();
// PORT
const port = process.env.PORT
// config cors 
const corsOptions = {
     origin: 'http://localhost:3000', // Replace with your frontend URL
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
     credentials: true, // Required for cookies, if you're using them
     optionsSuccessStatus: 204,
   };
// middleWare
const morgan = require("morgan");
app.use(cors(corsOptions));

app.use(morgan('dev'))

app.use(express.json());
app.use("/api/product",productRoute)
app.listen(port, () => {
     console.log("hello world");
})