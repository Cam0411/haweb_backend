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
     origin: 'https://web-admin-neon.vercel.app/', // Replace with your frontend URL
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
     credentials: true, // Required for cookies, if you're using them
     optionsSuccessStatus: 204,
   };
app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin','https://web-admin-neon.vercel.app/');
     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
   });
// middleWare
const morgan = require("morgan");
app.use(cors(corsOptions));

app.use(morgan('dev'))

app.use(express.json());
app.use("/api/product",productRoute)
app.listen(port, () => {
     console.log("hello world");
})