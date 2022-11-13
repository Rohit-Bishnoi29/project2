const express = require("express");
const dotenv = require("dotenv");
const res = require("express/lib/response");
const app = express();
dotenv.config({ path: './config.env' });
require("./db/conn");
const User = require("./model/userSchema");
app.use(express.json());
app.use(require('./router/auth'));


 
app.get("/about", (req, res) => {
    res.send("Hello About Wolrd from the server");
});
app.get("/contact", (req, res) => {
    res.send("Hello Contact Wolrd from the server");
});
app.get("/signin", (req, res) => {
    res.send("Hello Signin Wolrd from the server");
});
app.get("/signup", (req, res) => {
    res.send("Hello Signup Wolrd from the server");
});
const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});