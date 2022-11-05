const express = require("express");
const res = require("express/lib/response");
const app = express();

const middleware = (req,res,next)=>{
    console.log("Hello from Middleware ");
    next();
}

app.get("/", (req, res) => {
    res.send("Hello Wolrd from the server");
});
app.get("/about",middleware, (req, res) => {
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
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});