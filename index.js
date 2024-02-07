//Importing from Express to make the app, and using Body-Parser middleware.
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let name = "";

let mhistory = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs");
}); 

app.post("/signin", (req, res) => {
    name = req.body["username"]
    
    res.render("homepage.ejs", {
        username: name
    });
});

app.post("/post", (req, res) => {
    
    let m = req.body["messages"];

    mhistory.push(m);
    
    res.render("homepage.ejs", {
        username: name,
        messages: mhistory
    });
})

app.get("/homepage", (req, res) => {
    res.render("homepage.ejs");
}); 

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



