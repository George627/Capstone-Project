//Importing from Express to make the app, and using Body-Parser middleware.
import express from "express";
import bodyParser from "body-parser";

//Using the app variable to use express.
const app = express();

//Using port 3000 for the project.
const port = 3000;

//Variables that will be used for the user's username and stores their messages in EJS. 
let name = "";
let mhistory = [];

//Connects the public folder to use images located there.
app.use(express.static("public"));

//Middleware.
app.use(bodyParser.urlencoded({ extended: true }));

//A Get request that renders the index.ejs.
app.get("/", (req, res) => {
    res.render("index.ejs");
}); 

//A Post request that request the username from the user. Then render the homepage.ejs.
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



