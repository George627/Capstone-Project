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

    //Grabs the username that the user submitted for the Post request.
    name = req.body["username"]

    //Renders the homepage.ejs along with the username the user provided.
    res.render("homepage.ejs", {
        username: name
    });
});

//A Post request that gets the message from the user. Then render the homepage.ejs.
//Once received, the message is added to the mhistory array to store user's messages.
app.post("/post", (req, res) => {

    //Creating the m variable to handle the messages that the user sends.
    let m = req.body["messages"];

    //Push the new message into the mhistory Array.
    mhistory.push(m);

    //Renders the homepage.ejs, along with the user's username and message history.
    res.render("homepage.ejs", {
        username: name,
        messages: mhistory
    });
})

//Renders homepage.ejs.
app.get("/homepage", (req, res) => {
    res.render("homepage.ejs");
}); 

//App listening on Port 3000.
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



