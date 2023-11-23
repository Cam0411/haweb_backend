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
     origin: ['http://localhost:3000', 'https://web-admin-neon-2.vercel.app','https://hadotet-online.preview-domain.com','https://web-admin-hazel.vercel.app','https://do-tet-2024.vercel.app','https://www.trangtritetshop.com','https://trangtritetshop.com'],// Remove the trailing slash
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
     credentials: true, // Required for cookies, if you're using them
     optionsSuccessStatus: 204,
   };
   
   app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['http://localhost:3000', 'https://web-admin-neon-2.vercel.app','https://hadotet-online.preview-domain.com','https://web-admin-hazel.vercel.app','https://do-tet-2024.vercel.app','https://www.trangtritetshop.com','https://trangtritetshop.com']); // Remove the trailing slash
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