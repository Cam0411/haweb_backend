const express = require('express')
const db = require("./db/db.js")
const productRoute = require("./route/product-route.js")
const blogRoute = require("./route/blog-route.js")
const cors = require('cors');
// sitemap 
const {SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
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
app.use("/api/blog",blogRoute)
// sitemap 
const baseUrl = 'https://www.trangtritetshop.com'; 

app.get('/sitemap.xml', async (req, res) => {
  const pages = [
    '/',
    '/about-us',
    '/category',
    '/save-product',
    '/product'
    // Add more pages as needed
  ];

  const stream = new SitemapStream({ hostname: baseUrl });

  pages.forEach((page) => {
    stream.write({ url: page, changefreq: 'weekly', priority: 0.8 });
  });

  stream.end();

  try {
    const sitemapXML = await streamToPromise(stream).then((data) => data.toString());

    res.header('Content-Type', 'application/xml');
    res.send(sitemapXML);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.listen(port, () => {
     console.log("hello world");
})