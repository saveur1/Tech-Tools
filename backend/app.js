const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const errorMiddleWare = require("./middlewares/errors");
const pageNotFound = require("./middlewares/pageNotFound");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const compression = require("compression");
const { default: helmet } = require("helmet");

// IMPORTING ALL ROUTERS
const products = require("./router/products");
const users = require("./router/user");
const order = require("./router/order");
const payment = require("./router/payment");

//DOTENV CONFIG
require("dotenv").config({ path:"backend/config/.env" });


app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(compression());

app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        },
      },
    })
);

// app.use(cors({
//     credentials:true,
//     origin: "http://localhost:3000"
// }));


app.use("/api/v1",products);
app.use("/api/v1",users);
app.use("/api/v1",order);
app.use("/api/v1",payment);

if(process.env.NODE_ENV === "PRODUCTION"){
    app.use(express.static(path.join(__dirname,"../frontend/build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(path.join(__dirname,"../frontend/build/index.html")));
    })
}

// Error Handling Middleware
app.use(pageNotFound);
app.use(errorMiddleWare);


module.exports = app;
